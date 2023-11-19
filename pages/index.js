import Image from 'next/image'
export default function Home() {
  return (
    <div className = "landing-page" id = "parent">
      <title>OneVote</title>
      <div className = "landing-page-header">
        <Image src = "/Logo_V2-Transparent.png" width = {300} height = {300} />
      </div>


     <div className = "landing-page-bg-wrapper">
       <Image className = "landing-page-bg" src = "/backgroundVid.gif" width = {300} height = {300} />
     </div>
     <div className="landing-container">
   <div className="absolute">
   <div className = "landing-page-h1">
         <p>You only get
           <span class="test2"> O</span>
           <span class="test1">n</span>
           <span class="test2">e</span>
           <span class="test1">V</span>
           <span class="test2">o</span>
           <span class="test1">t</span>
           <span class="test2">e</span>
           .
         </p>
        
     </div>

      <div className = "landing-page-h2">
          <p className = "landing-page-h2-p">So make it count.</p>
      </div>

      <div className = "landing-page-link-group">
        <div className = "landing-page-left-container">
          <a className = "landing-page-left-link" href="/info">Find your representatives! </a>
        </div>

        <div className = "landing-page-right-container">
          <a className = "landing-page-right-link" href="/chat"> Ask questions to our AI assistant!</a>
        </div>
      </div>

    </div>
      </div>
    </div>
  )
}