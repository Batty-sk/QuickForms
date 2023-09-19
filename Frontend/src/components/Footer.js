import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS file

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; 2023 Your Company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 social-icons">
                        <a href="#" className="social-icon"><FaFacebook /></a>
                        <a href="#" className="social-icon"><FaTwitter /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
    
}

export default Footer;
