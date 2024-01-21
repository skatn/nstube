import React, { useState } from 'react';
import styles from './Search.module.css';
import { FaYoutube } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?search_query=${searchQuery}`);
  };

  return (
    <nav className={styles.container}>
      <Link to='/' className={styles.logo}>
        <FaYoutube size='2.5rem' fill='red' />
        <span className={styles.logoText}>NsTube</span>
      </Link>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='검색'
          name='search_query'
          value={searchQuery}
          onChange={handleChange}
        />
        <button>
          <CiSearch size='1.2rem' />
        </button>
      </form>
    </nav>
  );
}
