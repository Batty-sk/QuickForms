import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS file

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mono">
                        <p>&copy; 2023 Your Company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 social-icons">
                        <a href="#" className="social-icon"><FaFacebook /></a>
                        <a href="#" className="social-icon"><FaTwitter /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 additional-content mono">
                        {/* Add more content here */}
                        <p>Contact us: saorav.skumar@gmail.com</p>
                        <p>Phone: +91 9730129156</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
