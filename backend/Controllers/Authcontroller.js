const mongoose = require('mongoose');
const express = require('express');
const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: req.user, 
    });
    
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }
};

module.exports = {loginSuccess};