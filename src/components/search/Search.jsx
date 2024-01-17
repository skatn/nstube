import React from 'react';
import styles from './Search.module.css';
import { FaYoutube } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

export default function Search() {
  return (
    <nav className={styles.container}>
      <Link to='/' className={styles.logo}>
        <FaYoutube size='2.5rem' color='red' />
        <span>NsTube</span>
      </Link>
      <form className={styles.search}>
        <input type='text' placeholder='검색' />
        <button>
          <CiSearch size='1.2rem' />
        </button>
      </form>
    </nav>
  );
}
