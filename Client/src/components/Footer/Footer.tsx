import React from 'react'

function Footer() {
  return (
    <footer className=" text-black py-8">
  <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
    <div className="mb-4">
      <h2 className="text-xl font-bold">SkillUp</h2>
      <p className="text-sm">For enhance you Skill</p>
    </div>
    <nav className="mb-4">
      <ul className="flex flex-wrap space-x-8">
        <li><a href="#" className="text-sm">Hire talent</a></li>
        <li><a href="#" className="text-sm">Inspiration</a></li>
        <li><a href="#" className="text-sm">Advertising</a></li>
        <li><a href="#" className="text-sm">Blog</a></li>
        <li><a href="#" className="text-sm">About</a></li>
        <li><a href="#" className="text-sm">Careers</a></li>
        <li><a href="#" className="text-sm">Support</a></li>
      </ul>
    </nav>
    <div>
      <ul className="flex space-x-4">
        <li><a href="#" className="text-lg"><i className="fab fa-twitter"></i></a></li>
        <li><a href="#" className="text-lg"><i className="fab fa-facebook"></i></a></li>
        <li><a href="#" className="text-lg"><i className="fab fa-instagram"></i></a></li>
        <li><a href="#" className="text-lg"><i className="fab fa-pinterest"></i></a></li>
      </ul>
      <p className="text-sm">&copy; 2024 Skillup  | <a href="#" className="text-sm">Terms</a> | <a href="#" className="text-sm">Privacy</a> | <a href="#" className="text-sm">Cookies</a></p>
    </div>
  </div>
</footer>

  )
}

export default Footer