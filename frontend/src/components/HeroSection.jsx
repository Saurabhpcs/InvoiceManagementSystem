import React, { useEffect } from 'react';
import './HeroSection.css';
import { motion } from "framer-motion"
import { fadeIn } from '../Framers';


const HeroSection = () => {
    useEffect(() => {
        window.particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#000000"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#000000",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }, []);




  return (
    <>
      <motion.div
      initial="hidden"
      whileInView="show" 
      variants={fadeIn('left', 0.01)} 
      viewport={{ once: false, amount: 0.2 }}
    >
      <div id="particles-js" className="particles-background"></div>

      <div className="hero-section">
        <div className="job-search">
          <div className="job-search-content">
            <h1 className='hh'>Find Your Invoices <br /> <span className='hh'>Quickly and Easily</span></h1>
            <p className="hero-desc">
            Step into a world of seamless invoice management! Here, you'll find a comprehensive overview of all invoices, neatly organized by their due and paid statuses. Effortlessly access crucial details such as customer names, email addresses, purchased items, and transaction dates, all in one intuitive platform
            </p>
            <div className="job-search-form">
            <button type="button" class="btn btn-primary" style={{fontSize: "25px"}}>Check your invoices below</button>
            </div>
          </div>

          <div className="job-search-image">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzl3dXA1b2dzZG5zeWF3YjhjazBrb3dwOGphcjN1emtjajV4c3RzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/F9e6Ceg1ullxFEKbj5/giphy.webp" 
            alt="Job Search Illustration"
            style={{borderRadius: "50%"}}
            />
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
}

export default HeroSection;