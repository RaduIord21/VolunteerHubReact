import React, { useEffect, useState }from'react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function Home() {
  let[htmlFileString, setHtmlFileString] = useState();

  async function fetchHtml() {
    setHtmlFileString(await (await fetch('home.html')).text());
  }
  useEffect(() => {
    fetchHtml();
  }, []);

  return(
    <div className="page-wrapper">
      <Header />
      <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
      <Footer />
    </div>
  );
}

export default Home;
