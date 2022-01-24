import { BsDiamondFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import Link from 'next/link'

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg fixed-top" id="mainNav">
      <div className="container">
        <Link href="/blog" passHref>
          <a className="navbar-brand" >
            <BsDiamondFill className="spinner-element" /><span className="mx-3">tatsuya.blog</span>
          </a>
        </Link>
        <button className="navbar-toggler font-weight-bold text-white btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <Link href="/" passHref>
                <a className="nav-link py-3 px-0 px-lg-3">go to tatsuya</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
