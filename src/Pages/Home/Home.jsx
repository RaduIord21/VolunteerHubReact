import React, { useEffect, useState }from'react';

function Home() {
  let[htmlFileString, setHtmlFileString] = useState();

  async function fetchHtml() {
    setHtmlFileString(await (await fetch('home.html')).text());
  }
  useEffect(() => {
    fetchHtml();
  }, []);

  return(
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: htmlFileString }}></div>
    </div>
  );
}

export default Home;
