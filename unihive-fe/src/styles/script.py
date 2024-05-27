import re

# Function to determine whether the property should be converted to vw or vh
def get_conversion_factor(property_name):
    if any(prop in property_name for prop in ["width", "margin-left", "margin-right", "padding-left", 
                                              "padding-right", "line-height", "gap", "left", "right"]):
        return "--rem-to-vw"
    else:
        return "--rem-to-vh"

# Function to convert rem values to calc expressions based on vw or vh
def rem_to_calc(match):
    rem_value = float(match.group(2))
    conversion_factor = get_conversion_factor(match.group(1))
    return f"{match.group(1)}calc({rem_value} * var({conversion_factor}))"

# Function to convert all rem values to calc expressions based on vw or vh in a CSS file
def convert_rem_to_calc(css_text):
    pattern = r'(\b(?:width|height|margin(?:-top|-bottom|-left|-right)?|padding(?:-top|-bottom|-left|-right)?|top|bottom|left|right|line-height|gap):\s*)(\d*\.?\d+)rem'
    css_text = re.sub(pattern, rem_to_calc, css_text)
    return css_text

def px_to_rem(match):
    px_value = float(match.group(1))
    rem_value = px_value / 16  # Assuming 1rem = 16px
    return f"{rem_value}rem"

def convert_px_to_rem(css_text):
    # Convert pixel values to rem
    css_text = re.sub(r'(\d*\.?\d+)px', px_to_rem, css_text)
    return css_text

# Function to process CSS file
def process_css_file(file_path):
    with open(file_path, 'r') as file:
        css_text = file.read()

    css_text = convert_px_to_rem(css_text)
    
    # Convert rem values to calc expressions based on vw or vh
    css_text = convert_rem_to_calc(css_text)
    
    # Write the modified CSS back to the file
    with open("out.css", 'w') as file:
        file.write(css_text)

# Example usage
if __name__ == "__main__":
    css_file_path = "C:\\Users\\Mcmon\\Downloads\\temp\\development-platform-biog\\unihive-fe\\src\\styles\\ProfilePage.css"  # Path to your CSS file
    process_css_file(css_file_path)
