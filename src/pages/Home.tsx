import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';

/*Import Assets */
import headerImg from '../assets/IMG_2683.png';
import banner1 from '../assets/banner-1.png';
import banner2 from '../assets/banner-2.png';
import banner3 from '../assets/banner-3.png';
import banner4 from '../assets/banner-4.png';
import banner5 from '../assets/banner-5.png';
import banner6 from '../assets/banner-6.png';
import banner7 from '../assets/banner-7.png';
import banner8 from '../assets/banner-8.png';
import arrival1 from '../assets/IMG_2689.png';
import arrival2 from '../assets/IMG_2690.png';
import arrival3 from '../assets/IMG_2692.png';

const Home: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    const sr = ScrollReveal();

    sr.reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right" as any,
    });
    sr.reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
    sr.reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    sr.reveal(".header__btns", {
      ...scrollRevealOption,
      delay: 1500,
    });

    sr.reveal(".arrival__card", {
      ...scrollRevealOption,
      interval: 300,  
    });

    sr.reveal(".sale__image img", {
      ...scrollRevealOption,
      origin: "left" as any,
    });
    sr.reveal(".sale__content h2", {
      ...scrollRevealOption,
      delay: 500,
    });
    sr.reveal(".sale__content p", {
      ...scrollRevealOption,
      delay: 1000,
    });
    sr.reveal(".sale__content h4", {
      ...scrollRevealOption,
      delay: 1000,
    });
    sr.reveal(".sale__btn", {
      ...scrollRevealOption,
      delay: 1500,
    });

    sr.reveal(".favourite__card", {
      ...scrollRevealOption,
      interval: 500,
    });

    /* Banner duplication for infinite scroll */
    if (bannerRef.current) {
      const bannerContent = Array.from(bannerRef.current.children);
      bannerContent.forEach((item) => {
        const duplicateNode = item.cloneNode(true) as HTMLElement;
        duplicateNode.setAttribute("aria-hidden", "true");
        bannerRef.current?.appendChild(duplicateNode);
      });
    }

    return () => sr.destroy();
  }, []);

  return (
    <div className="home-page">
      <header>
        <div className="section__container header__container">
          <div className="header__content">
            <h1>LET'S EXPLORE UNIQUE CLOTHES.</h1>
            <p>Live for influential and innovative fashion!</p>
            <div className="header__btns">
              <Link to="/collection" className="btn">Shop Now</Link>
              <a href="https://wa.me/7725878970?text=Hey!" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366' }}>
                <i className="ri-whatsapp-line"></i> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="header__image">
            <img src={headerImg} alt="header" />
          </div>
        </div>
      </header>

      <section className="banner">
        <div className="banner__container" ref={bannerRef}>
          <img src={banner1} alt="banner" />
          <img src={banner2} alt="banner" />
          <img src={banner3} alt="banner" />
          <img src={banner4} alt="banner" />
          <img src={banner5} alt="banner" />
          <img src={banner6} alt="banner" />
          <img src={banner7} alt="banner" />
          <img src={banner8} alt="banner" />
        </div>
      </section>
  
      <section className="section__container arrival__container" id="catalogue">
        <h2 className="section__header">NEW ARRIVALS</h2>
        <div className="arrival__grid">
          <div className="arrival__card">
            <Link to="/collection?type=hoodie" className="arrival__image">
              <img src={arrival1} alt="Hoodies & Sweatshirts" />
            </Link>
            <div className="arrival__content">
              <h4>Classic Premium - Shirts</h4>
              <Link to="/collection?type=hoodie" className="btn btn-explore">Explore Now</Link>
            </div>
          </div>

          <div className="arrival__card">
            <Link to="/collection?type=jeans" className="arrival__image">
              <img src={arrival2} alt="Jeans" />
            </Link>
            <div className="arrival__content">
              <h4>Tees & T-Shirt</h4>
              <Link to="/collection?type=jeans" className="btn btn-explore">Explore Now</Link>
            </div>
          </div>

          <div className="arrival__card">
            <Link to="/collection?type=tshirt" className="arrival__image">
              <img src={arrival3} alt="Tees & T-Shirt" />
            </Link>
            <div className="arrival__content">
              <h4>Premium Polo T-shirts</h4>
              <Link to="/collection?type=tshirt" className="btn btn-explore">Explore Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sale" id="fashion">
        <div className="section__container sale__container">
          <div className="sale__image">
            <img src={headerImg} alt="sale" />
          </div>
          <div className="sale__content">
            <h2><span>Big Offer Coming Soon!</span></h2>
            <p>Stay tuned for our next fashion sale — exclusive discounts and new arrivals waiting for you!</p>
            <h4 style={{ marginBottom: '1rem' }}>Join our WhatsApp community to get early access</h4>
            <a href="https://wa.me/7725878970?text=Hey!" target="_blank" rel="noopener noreferrer" className="btn">Notify Me on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section__container favourite__container" id="favourite">
        <h2 className="section__header">YOUNG'S FAVOURITE</h2>
        <div className="favourite__grid">
          <div className="favourite__card">
            <div className="favourite__image">
              <img src={arrival1} alt="favourite" />
            </div>
            <div className="favourite__content">
              <h4>Trending on Instagram</h4>
              <Link to="/collection" style={{ color: 'var(--text-light)', fontWeight: 500 }}>Explore Now <i className="ri-arrow-right-line"></i></Link>
            </div>
          </div>
          <div className="favourite__card">
            <div className="favourite__image">
              <img src={arrival2} alt="favourite" />
            </div>
            <div className="favourite__content">
              <h4>All under Rs. 999</h4>
              <Link to="/collection" style={{ color: 'var(--text-light)', fontWeight: 500 }}>Explore Now <i className="ri-arrow-right-line"></i></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="promo">
        <div className="section__container promo__container">
          <h2 className="section__header" style={{ color: 'var(--white)' }}>JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO</h2>
          <p style={{ color: 'var(--white)', marginBottom: '2rem' }}>Type your email down below and be young wild generation</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Add your email here" required />
            <button className="btn">SEND</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
