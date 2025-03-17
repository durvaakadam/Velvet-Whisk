import React from 'react';
import { Helmet } from 'react-helmet';
import './About.css'; // Include the CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import milkcan3 from './milkcan3.png'; // Adjust path as necessary
import milkcan10 from './milkcan10.png';
import bottles from './bottles.png';
import logo from './logo786.png'

const About = () => {
  return (
    <div className='maindiv'>
    <nav className="navbar">
    <ul className="nav-links">
        <li><a href="/home">Home</a></li>
        {/* <li><a href="/about">About</a></li> */}
        {/* <li><a href="/about">About</a></li> */}
        <li><a href="/home">Order Now</a></li>
        
    </ul>
</nav>
    <div className="landing-container">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="text-container">
      
        <div className="logo"><img src={logo} alt="Image 2" className="logoimg" />VELVET & WHISK</div>
        <h1 className="main-heading">TASTE THE MAGIC</h1>
        <p className="sub-heading">Experience the enchantment of every drop, where rich flavors and creamy goodness come together in perfect harmony</p>
        <a href="/home">
            <button className="connect-button">GRAB YOUR BLISS</button>
          </a>      </div>

      <div className="images-container">
        <img src={milkcan3} alt="Image 1" className="animated-image img1" />
      </div>    
    </div>
    <div classname="extra">
 
</div>
     {/* New Info Section */}
     <div className="info-section">
        <div className="info-content">
          <div className='info-text'>
          <h2>Why Choose Us?</h2>
          <p>Welcome to a world where every sip is a journey of indulgence! Our specially crafted flavored milk offers a symphony of delightful tastes designed to awaken your senses. Whether you're savoring the rich and nutty Almond, the creamy, tropical Mango, the luxurious Pista, or the fragrant and romantic Rose, each flavor is meticulously blended to perfection. We believe in celebrating the joy of natural ingredients, where health meets irresistible taste, ensuring every bottle brings you a moment of pure bliss. Dive into our world of refreshing flavors and let each sip tell a story of tradition, quality, and passion.
</p>
          </div>
          <img src={bottles}alt="Info" className="info-image" />
        </div>
      </div>

      {/* New Info Section */}
     <div className="info-section2">
        <div className="info-content2">
          <div className='info-text2'>
          <h2>About us</h2>
          <p>
          At VELVET & WHISK, we are passionate about bringing you the finest, most delightful flavored milk that combines the richness of tradition with the innovation of modern taste. Our journey began with a simple mission – to create beverages that not only refresh but also elevate your everyday moments. We carefully select the highest quality ingredients, ensuring that every bottle bursts with the vibrant flavors of almond, pista, mango, and rose. Our commitment to excellence and love for what we do drives us to continuously craft products that deliver both health and indulgence. Join us on a flavorful adventure, where each sip is a step into a world of pure taste and natural goodness!
</p>
          </div>
          <img src={milkcan10} alt="Info" className="info-image2" />
        </div>
      </div>

<body>
      <footer class="footer">
    <div class="waves">
      <div class="wave" id="wave1"></div>
      <div class="wave" id="wave2"></div>
      <div class="wave" id="wave3"></div>
      <div class="wave" id="wave4"></div>
    </div>
    <ul class="social-icon">
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-facebook"></ion-icon>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-twitter"></ion-icon>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-linkedin"></ion-icon>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-instagram"></ion-icon>
        </a></li>
    </ul>
    <h3 className='footerhead'>VELVET & WHISK</h3>
    <ul class="menu">
      
      <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
      <li class="menu__item"><a class="menu__link" href="#">About</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>

    </ul>
    <ul className="social-links">
        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
        <li><a href="tel:+123456789"><i className="fas fa-phone"></i></a></li>
    </ul>
  </footer>
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>


    </div>
  );
};

export default About;