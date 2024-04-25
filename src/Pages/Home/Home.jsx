import React from 'react';

function Home() {
    
    return (<>
        <div className="container">
      <header className="text-center py-5">
        <h1>Welcome to My Website</h1>
      </header>
      <main>
        <section className="mb-5">
          <div className="row">
            <div className="col-md-6">
              <h2>About Us</h2>
              <p>This is a brief description of our company or website.</p>
            </div>
            <div className="col-md-6">
              <img src="data:image/png;base64,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" alt="About Us" className="img-fluid" />
            </div>
          </div>
        </section>
        <section className="mb-5">
          <h2>Services</h2>
          <div className="row">
            <div className="col-md-4">
              <h3>Service 1</h3>
              <p>Description of Service 1</p>
            </div>
            <div className="col-md-4">
              <h3>Service 2</h3>
              <p>Description of Service 2</p>
            </div>
            <div className="col-md-4">
              <h3>Service 3</h3>
              <p>Description of Service 3</p>
            </div>
          </div>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>Contact information goes here.</p>
        </section>
      </main>
      <footer className="text-center py-4">
        <p>&copy; 2024 MyWebsite. All rights reserved.</p>
      </footer>
    </div>
        </>
    )
}

export default Home;
