import React from "react";
import './About.css';
import linkedin from "../../images/linkedinLogo.png";
import github from "../../images/githubLogo.png";
import gmail from "../../images/gmailLogo3.png";

 export default function About() {
    return (
      <div className="about-container">
        <div className="about-description">
            
            <h2><u>ABOUT THIS SINGLE PAGE APPLICATION:</u></h2>
            <div className='about-text'>
                <span><u> - Necessary technologies:</u>
                    <ul className='techs-text'><br />
                        <ul>[ ] React</ul>
                        <ul>[ ] Redux</ul>
                        <ul>[ ] Express</ul>
                        <ul>[ ] Sequelize - Postgres</ul>
                    </ul>
                </span><br /><br />
                
                <p>
                    Gamming.Life is a Full Stack Web Application of an individual project, 
                    held during my bootcamp in{" "}
                    <a
                    href="https://www.soyhenry.com"
                    target="_blank"
                    rel="noopener noreferrer">
                    #soyHenry
                    </a>, being one of the 2 required projects.
                </p><br /><br />
            
                <p>
                    The technologies used here are Express, Sequelize, PostgreSQL,
                    React, Redux, and pure CSS, among others. This application uses the
                    API{" "}
                <a
                    href="https://rawg.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        RAWG.io
                </a>{" "}
                        to obtain information about most of all the existent videogames of the world,
                        store them in a local database, require and work them from the API itself.
                </p>
            </div>
        <div><div className='vg-logo'></div> <span>Gamming.Life by @brachintosh</span><br /></div>
        </div>

        <div className="about-contact"><br /><br /><br />
            <h3><u>Contact Me:</u></h3>
            <div className="contact-container">
                <div className="contact-item">
                    <a
                        href="https://www.linkedin.com/in/brian-ezequiel-bedendo/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <div className="fondo-img-link">
                        <img
                            src={linkedin}
                            alt="Logo LinkedIn"
                            className="contact-item-img" // Linked-In
                        />
                    </div>
                    </a>
                    <span>LinkedIn</span>
                </div>
                <div className="contact-item">
                    <a
                        href="https://github.com/Brachintosh"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={github}
                            alt="Logo GitHub"
                            className="contact-item-img-github" // GitHub
                        />
                    </a>
                    <span>GitHub</span>
                </div>
                <div className="contact-item">
                    <a
                        href="mailto:bedendo.br@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={gmail} alt="Logo Gmail" className="contact-item-img-gmail" />
                    </a>
                    <span>Gmail</span>
                </div>
            </div>
        </div>
      </div>
    );
  };