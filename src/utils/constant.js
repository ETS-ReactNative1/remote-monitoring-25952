import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const colors = [
    '#fff',
    '#545456',
    '#efefef',
    '#bdbdbd',
    '#77B68B',
    '#333334',
    '#878788'
];
const url = "https://preventive-counseli-25953.botics.co/api/v1/";
const iconLink = '../assets/icons/';
const imageLink = '../assets/images/';
const vectorLink = '../assets/vectors/';

const fontFamily = 'Roboto-Regular';
const fontFamilyBold = 'Roboto-Bold';

const navigationOptions = {
    header:null
}

const guide_ = [
    {
        id:0,
        head:'This is your Personal Health Coach!',
        para:'Track your health, learn more about prevention and prevent disease before it starts!\n"Get a little better every day"',
    },
    {
        id:1,
        head:'Log your blood pressure',
        para:'We color code the results for you and let you know what to do next.',
    },
    {
        id:2,
        head:'Step on the scale two to three times a week and we will record your weight here.',
        para:'',
    },
    {
        id:3,
        head:'Just keep your phone with you, the pedometer fills up as you walk!',
        para:'Goal: 10,000 steps a day',
    },
    {
        id:4,
        head:'Tap when you eat a fruit or vegetable',
        para:'Goal: 8 fruits and/or vegetables a day',
    },
    {
        id:5,
        head:'Tap when you drink water',
        para:'Goal: 8 big glasses a day',
    },
    {
        id:6,
        head:'The best way to prevent disease is to take it one step at a time. No big fad diets or major workout plans needed.',
        para:'Go to "My Plans" and choose one simple thing you can work on. Go back anytime to My Plans and start a new prevention module.',
    },
]

export {iconLink, imageLink,vectorLink, width, height, navigationOptions, colors, fontFamily, fontFamilyBold, guide_, url };