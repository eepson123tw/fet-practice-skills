import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
import time
from pathlib import Path

def capture_screenshot(html_file, output_dir):
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Run in headless mode
    chrome_options.add_argument('--hide-scrollbars')
    chrome_options.add_argument('--window-size=1920,1080')
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # Convert file path to file URL
        file_url = Path(html_file).absolute().as_uri()
        driver.get(file_url)
        
        # Wait for page to load
        time.sleep(10)
        
        # Get full page screenshot
        screenshot = driver.get_screenshot_as_png()
        
        # Create output filename
        output_filename = os.path.join(
            output_dir, 
            os.path.splitext(os.path.basename(html_file))[0] + '.png'
        )
        
        # Save and resize image
        with open(output_filename, 'wb') as f:
            f.write(screenshot)
            
        # Resize with Pillow
        img = Image.open(output_filename)
        img = img.resize((500, 310), Image.Resampling.LANCZOS)
        img.save(output_filename)
        
        print(f"Screenshot saved: {output_filename}")
        
    finally:
        driver.quit()

def main():
    # Define directories
    dist_dir = "../dist"
    output_dir = "../public/screenshots"
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Find all HTML files in dist directory
    html_files = []
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    # Process each HTML file
    for html_file in html_files:
        capture_screenshot(html_file, output_dir)

if __name__ == "__main__":
    main()
