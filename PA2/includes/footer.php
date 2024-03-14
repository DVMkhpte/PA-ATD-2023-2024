<style>

footer {
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: 20px;
  background:  #225B7C;
  color: #f9f9f9;
}

footer article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 50px 40px;
  margin: -99px 20px 20px;
  border-radius: 10px;
  background: linear-gradient(90deg, #38A7A6, #59CD97);
}

footer article h2 {
  font-weight: 400;
  color: rgb(255 255 255 / 70%);
}

footer article button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 40px 0 44px;
  width: 100%;
  background: #0a1536;
  border: 0;
  border-radius: 30px;
  color: #f9f9f9;
  font-family: inherit;
  font-size: 16px;
}

footer section {
  padding: 0 50px;
}

section.top {
  padding-top: 30px;
  margin-bottom: 48px;
}

section.top img {
  display: block;
  height: 30px;
  margin: 0 0 30px;
}

section.top ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(2, 1fr);
}

@media (width > 480px) {
  footer article button {
    width: 70%;
  }

  section.top ul {
    padding-right: 10%;
  }
}

@media (width > 600px) {
  footer article {
    flex-direction: row;
    min-height: 140px;
    margin: -70px 20px 20px;
    padding: 30px 50px 30px;
  }

  footer article button {
    width: auto;
    padding: 0 20px 0 24px;
  }

  section.top ul {
    grid-template-columns: repeat(4, 1fr);
    padding-right: 0;
  }
}

section.top ul li a {
  display: block;
  margin-bottom: 10px;
  color: rgb(255 255 255 / 90%);
}

section.top h3 {
  color: rgb(255 255 255 / 40%);
  font-weight: 400;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
}

section.bottom {
  padding-top: 10px;
  border-top: 2px solid rgb(255 255 255 / 10%);
  color: white;
  font-size: 13px;
}

</style>


<footer>
      <article>
        <h2>Rejoignez nous</h2>
        <button>
          <p>Devenir bénévole</p>
          <span class="material-symbols-outlined"> trending_flat </span>
        </button>
      </article>

      <section class="top">
        <ul>
          <li>
            <h3>Resources</h3>
            <a>Usage</a>
            <a>Docs</a>
            <a>Support</a>
            <a>Hardware</a>
          </li>
          <li>
            <h3>Pricing</h3>
            <a>Overview</a>
            <a>Flexible Data</a>
            <a>High Volume</a>
            <a>Enterprise</a>
          </li>
          <li>
            <h3>Developers</h3>
            <a>Forum</a>
            <a>Projects</a>
            <a>Open Source</a>
            <a>GitHub</a>
          </li>
          <li>
            <h3>Company</h3>
            <a>About Us</a>
            <a>Blog</a>
            <a>Partnerships</a>
            <a>Careers</a>
          </li>
        </ul>
      </section>

      <section class="bottom">©2024 Au temps donné</section>
    </footer>