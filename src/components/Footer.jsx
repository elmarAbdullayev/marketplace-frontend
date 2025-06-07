import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
            <a href="#"><img src="/icons/twitter.svg" alt="Twitter" /></a>
            <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
