import asyncio
from playwright.async_api import async_playwright
import os

async def generate_pdf():
    html_path = os.path.abspath('resume_source.html').replace('\\', '/')
    pdf_path = os.path.abspath(os.path.join('public', 'Vijay_Sundar_Nagamalla_Resume.pdf'))

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(f'file:///{html_path}')
        await page.wait_for_timeout(2500)
        await page.pdf(
            path=pdf_path,
            format='A4',
            print_background=True,
            margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
        )
        await browser.close()
        print('PDF saved:', pdf_path)

asyncio.run(generate_pdf())
