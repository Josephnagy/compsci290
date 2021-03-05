/*
 * An example of transforming an uploaded image pixel by pixel.
 *
 * Basic implementation of a greyscale filter which uses a simple Grayscale  = 0.299R + 0.587G + 0.114B formula 
 * to calculate the RGB values of the greyscaled image 
 * 
 * @author Joseph Nagy
 */
// convenience variable to avoid repeatedly getting it in each method
let canvas = document.getElementById('imagecanvas');
// global state to keep track of between user interactions
let originalImage = null;
// not strictly needed - cache this version of the image to make it a little faster for interaction
let filteredImage = null;


// load image using user selected by file chooser input element and draw it using SimpleImage class
function loadImage() {
    originalImage = new SimpleImage(document.getElementById('fileInput'));
    originalImage.drawTo(canvas);
}

// verify that the image is ready to be solarized before calling the main function
function greyscale() {
    // verify user has actually uploaded an image
    if (originalImage != null) {
        // ONE WAY - create filtered image only once (check not needed -- small attempt to optomize "interactive" experience)
        if (filteredImage == null) {
            filteredImage = new SimpleImage(originalImage.getWidth(), originalImage.getHeight());
        }

        // manage details around doing filter algorithm: getting input and drawing into canvas
        // let threshold = document.getElementById('threshold').value;
        applyGreyscale(originalImage, filteredImage);
        filteredImage.drawTo(canvas);
    }
}

// apply greyscale filter by changing each pixel
// Note, always starts from original image so changing the threshold does not have a cumultive effect
function applyGreyscale(source, result) {
    // TWO WAYS TO ACCESS PIXELS
    // traditional loop - requires checking that the image is properly loaded first
    // if (source.isComplete()) {
    //     for (let pixel of result.pixels()) {
    //         let srcPixel = source.getPixel(pixel.getX(), pixel.getY());
    //         greyValue = getGrey(srcPixel.getRed(), srcPixel.getGreen(), srcPixel.getBlue())
    //         pixel.setRed(greyValue);
    //         pixel.setGreen(greyValue);
    //         pixel.setBlue(greyValue);
    //     }
    // }

    // typical way - pass "callback" function to be run when resource is ready
    result.forEachPixel(pixel => {
        let srcPixel = source.getPixel(pixel.getX(), pixel.getY());
        greyValue = getGrey(srcPixel.getRed(), srcPixel.getGreen(), srcPixel.getBlue());
        pixel.setRed(greyValue);
        pixel.setGreen(greyValue);
        pixel.setBlue(greyValue);
    });
}

// compute greyscale value given RGB values 
function getGrey(r, g, b) {
    return (0.299*r) + (0.587*g) + (0.114*b);
}

// erase image from canvas by drawing a rectangle over it
function clearCanvas() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // forget selected image
    originalImage = null;
    filteredImage = null;
}
