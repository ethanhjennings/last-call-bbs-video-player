import numpy as np
import cv2
import sys

term_width = 56
term_height = 20
num_term_colors = 17
frame_skip = 10 # Only render every nth frame

def clamp(val, small, large):
    return max(small, min(val, large))

def adj_brightness_contrast(color):
    # Crude brightness/contrast adjustment based on:
    # https://docs.opencv.org/3.4/d3/dc1/tutorial_basic_linear_transform.html
    alpha = 1.8
    beta = 80
    return clamp(round(alpha*color) - beta, 0, 255)

def img_to_array_str(data):
    output_str = '[\n'
    for y in range(term_height):
        output_str += '  ['
        for x in range(term_width):
            d = data[y][x]
            d = adj_brightness_contrast(d)
            output_str += str(int(round((d/255.0)*num_term_colors)))
            output_str += ','
        output_str += '],\n'
    output_str += ']'
    return output_str

if __name__ == "__main__":

    video_path = sys.argv[1]
    if len(sys.argv) > 2:
        name = sys.argv[2]
    else:
        name = "Video Player"

    vidcap = cv2.VideoCapture(video_path)

    data_array_str = "";

    count = 0
    success = True
    while success:
        success, image = vidcap.read()
        if success:
            count += 1

            # Only render every nth frame so that the file size isn't too big
            if count % frame_skip == 0:
                grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                denoised = cv2.fastNlMeansDenoising(grayscale, h=10)
                resized = cv2.resize(denoised, (term_width, term_height))
                #cv2.imwrite('out.jpg', resized)
                data_array_str += "// Frame " + str(count) + '\n'
                data_array_str += img_to_array_str(resized) + ",\n\n"

    with open('server_template.js') as f:
        server_template_str = f.read()

    # Populate template
    server_template_str = server_template_str.replace("<<frames>>", data_array_str)
    server_template_str = server_template_str.replace("<<name>>", name)
    server_template_str = server_template_str.replace("<<filename>>", video_path)

    print(server_template_str)
