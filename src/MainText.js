const MainText = function(){
    // the main section probably could've been built as a "special blog post" especially given styling but that component is already so busy,
    return(
        <div className="blogPostContainer">

        <h3 className="blogPostHeader"> Welcome to Rob's Blogs</h3>
        <p className="blogPostTimestamp"> Made by Rob Klassen for Juno College of Technology, Project 3</p>

        <p className="mainContent">On the Nav Bar to the right you'll find a list of all the <span className="mainYellow">Blogs</span> people have created</p>
        <p className="mainContent">The <span className="mainGreen">Return to Main</span> button will bring you back here, but there's really nothing interesting to see on this page... </p>
        <p className="mainContent">What you probably want is to <span className="mainOrange">View a Random Blog</span> to see what chaos people have created or plagued my poor website with</p>
        <p className="mainContent">And if you want to add to the chaos, I would encourage you to <span className="mainRed">Create A New Blog</span>, be as goofy as you'd like</p>
        <p className="mainContent">You're also able to delete individual posts, or entire blogs!  Though where's the fun in that?</p>
        <p className="mainContent"></p>
        <p className="mainContent"><strong>How it works:</strong></p>
        <p className="mainContent">This app was built in React, it makes extensive use of <em>components</em>, <em>useState</em>, <em>useEffect</em>, and specifically is meant to showcase accessing an external database.  For this project I'm using <em>Firebase</em> as my external database storage, and making use of <em>ref</em>, <em>onValue</em> (listening for changes), <em>remove</em>, and <em>push</em>.</p>
        <p className="mainContent">Ternaries read states to navigate and render appropriate components, and there's a focus on re-using those components through efficient use of props.  Everything is extremely modular.</p>
        <p className="mainContent">There's also some error handling to catch edge cases that can lead to problems, some more obvious examples: because the blog post titles are being used as a reference in the data structuring, and Firebase doesn't like using symbols for its node names, I had to disallow special characters in blog titles.  Likewise, newline characters are tricky to map (though ARE preserved through firebase), so I implemented a method to split text around newline characters and map the results to preserve "paragraphs" within a post.  I also built a way to specifically show that a blog has been deleted without rendering an unnessary component.</p>
        <p className="mainContent"><strong>Future Improvements to look out for: </strong></p>
        <p className="mainContent">It's currently styled using classic CSS3, though at some point I plan on converting it to SCSS.</p>
        <p className="mainContent">I also plan on re-styling the whole website at some point to visually match my portfolio branding; while I consider myself good at styling, I have not yet had the time to <em>design</em> this website.</p>
        <p className="mainContent">I also plan on improving the responsiveness and accessability, while this particular project isn't designed to showcase those skills specifically, they're of course very important to me, personally, and once I have the time to concentrate on that specifically I will implement it.</p>
        <p className="mainContent"></p>
        <p className="mainContent">Please visit my website,</p>
        <p> 
            <a href="https://robklassen.com/" class="mainAnchorMySite">
                RobKlassen.com
                <img src="rkcodelogo9.png" alt="My logo, the letter R and the letter K butted up against each other" />
            </a>
        </p>
    </div>
    )
}
export default MainText;