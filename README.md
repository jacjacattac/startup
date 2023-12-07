# Startup
## J Floral Co Website 
Wedding planning can be very difficult, and it’s especially hard in the beginning stages of planning to get a ballpark of costs. J Floral Co. is a floral company that handles all sorts of flower arrangements, but specializes in wedding florals. This website will showcase the florist’s work, as well as provide a page where people can receive an estimated cost based on the number of guests, bridesmaids, and groomsmen at the wedding. This will provide customers an opportunity to figure out their budget sooner rather than later. The impressive work of J Floral Co. that is readily available for them to see will influence them to hire her for their special day. 

## Key Features 
- Secure login over https 
- Display of buttons that will lead to other pages of the website 
- Ability to click on buttons and navigate from each page 
- Portfolio page which will link florists instagram to page to display her work
- Ability for user to input wedding information and receive a generated estimated cost

## Mock Website Design 
This is a generic layout. The text and features on the website is accurate, though the photos are not. 


![1](https://github.com/jacjacattac/startup/assets/92479749/78995068-c16b-44e7-abaa-79350749b209)

![2](https://github.com/jacjacattac/startup/assets/92479749/bbd0f794-146c-4d2f-abb5-95436389e8f8)

![3](https://github.com/jacjacattac/startup/assets/92479749/8d53becd-8e03-4c43-bab5-b22cf22f4279)

![4](https://github.com/jacjacattac/startup/assets/92479749/36493528-82bd-4337-a468-9b29b39236b0)

![5](https://github.com/jacjacattac/startup/assets/92479749/268992c9-9415-4118-b306-8afd977c70e1)

## Technologies 
- **HTML** - Use HTML structure for application. Five HTML pages. One for home page, one for login, one for cost estimation, one for contact info, and one for an about page. Hyperlinks to choice artifact.
- **CSS** - Use it for style, color, font, whitespace to make application look nice. 
- **JavaScript** - Provides login and inputting data 
- **WebService** - backend services for login and retrieving calculations for cost estimates. Connect to instagram server to display photos. 
- **DB** - Stores users and cost estimations in database.
- **Login** - Register and login users. Credentials securely stored in database. 
- **WebSocket** - Send data to server that an estimate was made and number of estimates will be counted and displayed on the website.
- **React** - Application ported to use the react web framework

## HTML Deliverable
- **HTML**  - Five HTML page that provide information about the business, have the ability to login and generate prices.
- **Links** - The login page automatically links to the consultation page. Each page contains menu bar with links to other pages.
- **Text** - Each page provides textual context.
- **Images** - Used a placeholder image to show where images would go in the website. 
- **Login** - Login available on first page that links to consultation.
- **Database** - Wasn’t sure exactly how to show a database placeholder so I just made a txt file that has the prices for the cost estimation, which will be used when the user clicks generate after entering prices on the consultation page. 
- **WebSocket** - When an estimation is made it will send data to server that estimation was made and updated number of estimations will be immediately displayed on the website. There is text there acting as a placeholder of where that information will go on the consultation page. 
- **3rd Party** - On portfolio page I put images as a placeholder for where the instagram service will be called and display the images.
  
## CSS Deliverable
- **Header, footer, and main content body**
- **Navigation elements** - I made my navigation elements a different size and spacing and a different color. 
- **Responsive to window resizing** - Looks good on all window sizes and devices
- **Application elements** - Used images and color schemes and spacing to create a good design
- **Application text content** - Consistent fonts and colors
- **Application images** - Used a picture of flowers for the background and included a picture of the florist. There are also images on the portfolio page to simulate the instagram page that will later be there.

## JavaScript Deliverable
- **Login** - Added JavaScript for logging in 
- **Database** - Eventually login data will be stored in a database
- **Websocket** - Will keep track of estimations and will later display the flowers on portfolio page
- **Interactive** - Consultation page allows for interaction, user gives input and a price is generated

## Web Service Deliverable 
- **Node.js/Express HTTP service** - done
- **Static middleware for frontend** - done
**Calls to third party endpoints** - Literally couldn't get the instagram api to work to save my life so dont have this one done
**Backend service endpoints** - done 
**Frontend calls service endpoints** - I did this using the fetch function.

