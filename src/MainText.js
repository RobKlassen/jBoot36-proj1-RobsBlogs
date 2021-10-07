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
        <p className="mainContent">-</p>
        <p className="mainContent">•Regarding this project, react was honestly very difficult for me.  I really wanted to incoporate firebase with react and I think I reached a little far, ultimately things are working but react didn't "click" until after the weekend, at which point time was much more limited.  There are things in this project that I just didn't get to, unfortunately.  Responsiveness and accessibility is like "bare minimum", and I'll fix it after bootcamp, but there really wasn't time given the importance of learning react.  Likewise, I know there's a few spots that could be made DRYer, but as I went along in the project I was a bit afraid to retroactively change things.  And by the time I was "comfortable" with react I was much too far gone and low on time. </p>
        <p className="mainContent">•There's plenty of features I -want- to add, like user authentication, being able to only edit your own blogs, being able to save or favourite blogs, being able to delete a blog you've made, adding image support, I haven't done nearly the amount of error handling I'm used to</p>
        <p className="mainContent">•Overall I learned a LOT, and really feel better about react, but it all sort of came too late to make something I'm actually happy with... </p>
    </div>
    )
}
export default MainText;