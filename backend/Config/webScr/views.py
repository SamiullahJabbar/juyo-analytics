from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from playwright.sync_api import sync_playwright
import pandas as pd
import time
import os

class HotelScraperAPIView(APIView):
    def post(self, request):
        checkin_date = request.data.get('checkin_date')
        checkout_date = request.data.get('checkout_date')
        location = request.data.get('location')

        if not checkin_date or not checkout_date or not location:
            return Response({'error': 'Please provide checkin_date, checkout_date, and location.'}, status=status.HTTP_400_BAD_REQUEST)

        # URL with dynamic dates and location for scraping
        page_url = f'https://www.booking.com/searchresults.en-us.html?checkin={checkin_date}&checkout={checkout_date}&selected_currency=USD&ss={location}&lang=en-us&group_adults=1&no_rooms=1&group_children=0&sb_travel_purpose=leisure'

        hotels_list = []  # List to store scraped hotel data
        seen_hotels = set()  # Set to track hotel names and avoid duplicates

        def scroll_to_bottom_slowly(page):
            """Scroll slowly to the bottom to allow content to appear."""
            scroll_height = page.evaluate("document.body.scrollHeight")
            current_position = 0
            scroll_step = 500

            while current_position < scroll_height:
                if page.is_closed():
                    break
                page.evaluate(f"window.scrollBy(0, {scroll_step})")
                current_position += scroll_step
                time.sleep(1)
                scroll_height = page.evaluate("document.body.scrollHeight")

        def scrape_visible_hotels(page):
            """Scrape all currently visible hotels on the page."""
            if page.is_closed():
                return
            hotels = page.locator('//div[@data-testid="property-card"]').all()

            for hotel in hotels:
                hotel_dict = {}

                try:
                    hotel_name = hotel.locator('//div[@data-testid="title"]').inner_text()
                    if hotel_name in seen_hotels:
                        continue
                    hotel_dict['hotel'] = hotel_name
                    seen_hotels.add(hotel_name)
                except Exception:
                    hotel_dict['hotel'] = "N/A"

                try:
                    price_element = hotel.locator('//span[@data-testid="price-and-discounted-price"]')
                    hotel_dict['price'] = price_element.first.inner_text(timeout=30000) if price_element.count() > 0 else "N/A"
                except Exception:
                    hotel_dict['price'] = "N/A"

                try:
                    hotel_dict['score'] = hotel.locator('//div[@data-testid="review-score"]/div[1]').inner_text()
                except Exception:
                    hotel_dict['score'] = "N/A"

                try:
                    hotel_dict['avg review'] = hotel.locator('//div[@data-testid="review-score"]/div[2]/div[1]').inner_text()
                except Exception:
                    hotel_dict['avg review'] = "N/A"

                try:
                    hotel_dict['reviews count'] = hotel.locator('//div[@data-testid="review-score"]/div[2]/div[2]').inner_text().split()[0]
                except Exception:
                    hotel_dict['reviews count'] = "N/A"

                try:
                    hotel_dict['address'] = hotel.locator('//span[@data-testid="address"]').inner_text()
                except Exception:
                    hotel_dict['address'] = "N/A"

                try:
                    hotel_dict['amenities'] = hotel.locator('//div[@data-testid="amenities"]').inner_text()
                except Exception:
                    hotel_dict['amenities'] = "N/A"

                hotels_list.append(hotel_dict)

        try:
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=False)
                page = browser.new_page()
                page.goto(page_url, timeout=120000)

                while True:
                    if page.is_closed():
                        break

                    scroll_to_bottom_slowly(page)
                    scrape_visible_hotels(page)

                    if page.is_closed():
                        break

                    load_more_button = page.locator('//button[contains(text(), "Load more results")]')
                    try:
                        if load_more_button.count() > 0:
                            load_more_button.click()
                            time.sleep(2)
                        else:
                            break
                    except Exception as e:
                        print(f"Error interacting with 'Load more results' button: {str(e)}")
                        break

        except Exception as e:
            return Response({'error': f"An error occurred during scraping: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        finally:
            try:
                if not page.is_closed():
                    browser.close()
            except Exception as e:
                print(f"Error while closing browser: {str(e)}")

        # Save data to CSV and Excel files
        # df = pd.DataFrame(hotels_list)
        # csv_file = os.path.join(os.getcwd(), 'hotels_list.csv')
        # excel_file = os.path.join(os.getcwd(), 'hotels_list.xlsx')
        # df.to_csv(csv_file, index=False)
        # df.to_excel(excel_file, index=False)

        return Response({
            'message': 'Scraping completed!',
            # 'csv_file': csv_file,
            # 'excel_file': excel_file,
            'total_hotels': len(hotels_list),
            'data': hotels_list
        }, status=status.HTTP_200_OK)
