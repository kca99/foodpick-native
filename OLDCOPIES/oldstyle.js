import {StyleSheet } from 'react-native';


//stylesheet starts ici
//uhhh this is still tentative, I just put arbitrary values for now that scaled down
//for font family, we can explore different sans-serifs
const heading1 = 30;
const heading2 = 24;
const heading3 = 16;
const para = 14;
export default StyleSheet.create({
    //flexbox grid sizes
    container1of5: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    container3of5: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    //fonts
    baseText: {
      fontFamily: 'Arial',
    },
  
    titleText: {
      fontSize: heading1,
      fontWeight: 'bold',
    },
  
    categoryText: {
      fontSize: heading2,
    },
  
    buttonText: {
      fontSize: heading3,
    },
  
    optionText: {
      fontSize: heading3,
    },
  
    bodyText: {
      fontSize: para,
    },
  
    //colors
    greyBg: {
      backgroundColor: 'grey',
    },
  
    whiteBg: {
      backgroundColor: 'white',
    },
  
    //styling for columns and rows
    vertColRightside: {
      flex: 1,
      backgroundColor: 'transparent',
      //set hidden to transparent
      flexDirection: 'column',
    },
  
    //button style
    buttonCategory: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderColor: 'black'
    },
  
    buttonTypeOfFood: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  