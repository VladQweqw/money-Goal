import '../assets/main.css' // css main file

export default function Home() {
  
  
  return (
    <main id="main">
      
      <div className="content-wrapper">
            <div className="content-slideshow">
              <ContentItem />
              <ContentItem />
              <ContentItem />
              <ContentItem />
            
            </div>

            <div className="tabs">
              <span className="tab active-tab"></span>
              <span className="tab"></span>
              <span className="tab"></span>
            </div>
      </div>
            
    </main>
  )
}


function ContentItem() {

  return(
    <div className="content">
    <h1 className="content-title m1">AT-uri</h1>

    <div className="money-wrapper">
        <div className="svg-gradient">
        </div>
        <div className="background-radial"></div>
        
        <div className="progress">
          <div className="progress-bar"></div>
          <div className="progress-value"></div>
        </div>
        
        <div className="money-circle">
          <p className="money-goal m3">/1000</p>

          <div className='money-container'>
            <h1 className="m1 money-current">985</h1>
            <p className="label m3">left</p>
          </div>

          <p className="money-procent m3">7%</p>
        </div>
    </div>

</div>
  )

}