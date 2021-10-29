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
    </div>
    )
}
export default MainText;