import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const colors = [
    '#fff',
    '#545456',
    '#efefef',
    '#bdbdbd',
    '#77B68B',
    '#333334',
    '#878788',
    '#597e66'
];
const url2 = "https://preventive-counseli-25953.botics.co/api/v1/";
const url = "https://remote-monitoring-25952.botics.co/api/v1/";
const iconLink = '../assets/icons/';
const imageLink = '../assets/images/';
const vectorLink = '../assets/vectors/';

const fontFamily = 'Roboto-Regular';
const fontFamilyBold = 'Roboto-Bold';
const firebaseConfig ={
    apiKey: "AIzaSyCiz992c7kU2mVpttvyQWcCzYjUi0ATtJ0",
    authDomain: "preventscripts-862d3.firebaseapp.com",
    databaseURL: "https://preventscripts-862d3.firebaseio.com",
    projectId: "preventscripts-862d3",
    storageBucket: "preventscripts-862d3.appspot.com",
    messagingSenderId: "1037024394086",
    appId: "1:1037024394086:web:c44ac709d6ed57bf7fe6a7"
  };
const navigationOptions = {
    header:null
}


// const goalsList = [
//     {
//         id:0,
//         text:'Eat Less Sugar',
//         value:'EAT_LESS_SUGAR',
        
//     },
//     {
//         id:1,
//         text:'Eat More Vegetables',
//         value:'EAT_MORE_VEGETABLES'
//     },
//     {
//         id:2,
//         text:'Move More',
//         value:'MOVE_MORE'
//     },
//     {
//         id:3,
//         text:'Drink More Water',
//         value:'DRINK_MORE_WATER'
//     },
//     {
//         id:4,
//         text:'Eat More Fruit',
//         value:'EAT_LESS_SUGAR'
//     },
//     {
//         id:5,
//         text:'Eat Less Red, Processed and Fatty Meats ',
//         value:'EAT_LESS_RED_PROCESSED_AND_FATTY_MEATS'
//     },
// ]

// const barrierList = [
//     {
//         id:0,
//         text:'Don\'t have time',
//         value:'DONT_HAVE_TIME'
//     },
//     {
//         id:1,
//         text:'Don\'t like to exercise',
//         value:'DONT_LIKE_TO_EXERCISE'
//     },
//     {
//         id:2,
//         text:'Don\'t like healthy food/water',
//         value:'LOVE_JUNK_FOOD'
//     },
//     {
//         id:3,
//         text:'Other priorities take over',
//         value:'CANT_STAY_MOTIVATED'
//     },
//     {
//         id:4,
//         text:'Don\'t know where to start',
//         value:'DONT_KNOW_WHERE_TO_START'
//     },
// ]

// const motivationsList = [
//     {
//         id:0,
//         text:'Live Longer',
//         value:'LIVE_LONGER'
//     },
//     {
//         id:1,
//         text:'Be More Mobile',
//         value:'BE_MORE_MOBILE'
//     },
//     {
//         id:2,
//         text:'Lose Weight',
//         value:'LOSE_WEIGHT'
//     },
//     {
//         id:3,
//         text:'Feel Better Overall',
//         value:'FEEL_BETTER_OVERALL'
//     },
//     {
//         id:4,
//         text:'Play With Children/Grandchildren',
//         value:'PLAY_WITH_GRANDCHILDREN'
//     },
// ]

const vegetableIcon = require('./../assets/icons/vegetable.png');
const fruitIcon = require('./../assets/icons/apple.png');
const mobileIcon = require('./../assets/icons/mobile.png');
const dropIcon = require('./../assets/icons/drop.png');
const boxIcon = require('./../assets/icons/box.png');
const meatIcon = require('./../assets/icons/meat.png');


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


const recommendationList = [
    {
        id:0,
        dose:'3 to 4',
        title:'Servings daily of fruits',
        para:'(equals 1(1/2) - 2 cups per day or 1/4 of your plate at each meal)',
        body:'Research shows that only about 1 in 10 Americans eat the recommended servings of fruits and vegetables daily.\nHow many servings can you add to your daily intake?',
        box:['servings, at least','days per week']
    },
    {
        id:1,
        dose:'6',
        title:'Servings daily of vegetables',
        para:'(equals 3 cups per day or 1/2 of your plate at each meal)',
        body:'6 servings daily of vegetables (equals 3 cups per day or 1/2 of your plate at each meal) Research shows that only about 1 in 10 Americans eat the recommended servings of fruits and vegetables daily.\nHow many servings can you add to your daily intake?',
        box:['servings, at least','days per week']
    },
    {
        id:2,
        dose:'10,000',
        title:'steps or 30 minutes of moderate activity at least 5 days of the week',
        para:'(need stats)',
        body:'How many steps or minutes can you add to your daily movement?',
        box:['steps, at day','minutes per day']
    },
    {
        id:3,
        dose:'80 to 120',
        title:'Drink ounces of water daily',
        para:'(see more specific guidelines below)',
        body:'Women: 80-100 oz (that’s at least 2.5 PreventScripts bottles daily)\nMen: 90-120oz (that’s at lesat 3.5 PreventScript bottles daily)\nHow many ounces of water can you add to your daily water intake?',
        box:['ounes, daily']
    },
    {
        id:4,
        dose:'10',
        title:'Consume no more than 10 teaspoons of sugar per day',
        para:'',
        body:'The average American consumes 34 teaspoons of  added sugar a day between food and drinks. The Dietary Guidelines for Americans recommends limiting consumption of added sugars to no more than 10% of total calories each day or no more than 10 teaspoons of sugar (1 tsp= 4 grams).Remember, slow easy changes is what we are after. No need to starve yourself.\nHow many teaspoons of sugar can you cut out of your daily intake? ',
        box:['teaspoons of sugar']
    },

    {
        id:5,
        dose:'',
        title:'Consume less red, processed and fatty meats',
        para:'',
        body:'Increased cancer risk and cardiovascular risk and are both greatly associated with red meat and processed meat consumption. What are red, processed and fatty meats?\nRed Meat: unprocessed beef, pork, lamb\nProcessed Meat: Bacon, hot dogs, sausages, and cold cuts should be avoided. Although these products are often made from red meats, processed meats also include items like turkey bacon, chicken sausage, and deli-sliced chicken and ham.\nThink about how many meals you currently have per week with red processed or fatty meat. What amount can you commit to that is less per week?',
        box:['meals per week']
    },

    
]

const goalsList = [
    {
        id:0,
        text:'Eat Less Sugar',
        value:'EAT_LESS_SUGAR',
        
    },
    {
        id:1,
        text:'Eat More Vegetables',
        value:'EAT_MORE_VEGETABLES'
    },
    {
        id:2,
        text:'Move More',
        value:'MOVE_MORE'
    },
    {
        id:3,
        text:'Drink More Water',
        value:'DRINK_MORE_WATER'
    },
    {
        id:4,
        text:'Eat More Fruit',
        value:'EAT_MORE_FRUIT'
    },
    // {
    //     id:5,
    //     text:'Eat Less Red, Processed and Fatty Meats ',
    //     value:'EAT_LESS_RED_PROCESSED_AND_FATTY_MEATS'
    // },
]

const barrierList = [
    {
        id:0,
        text:'Don\'t have time',
        value:'DONT_HAVE_TIME'
    },
    {
        id:1,
        text:'Don\'t like to exercise',
        value:'DONT_LIKE_TO_EXERCISE'
    },
    {
        id:2,
        text:'Don\'t like healthy food/water',
        value:'LOVE_JUNK_FOOD'
    },
    {
        id:3,
        text:'Other priorities take over',
        value:'CANT_STAY_MOTIVATED'
    },
    {
        id:4,
        text:'Don\'t know where to start',
        value:'DONT_KNOW_WHERE_TO_START'
    },
]

const motivationsList = [
    {
        id:0,
        text:'Live Longer',
        value:'LIVE_LONGER'
    },
    {
        id:1,
        text:'Be More Mobile',
        value:'BE_MORE_MOBILE'
    },
    {
        id:2,
        text:'Lose Weight',
        value:'LOSE_WEIGHT'
    },
    {
        id:3,
        text:'Feel Better Overall',
        value:'FEEL_BETTER_OVERALL'
    },
    {
        id:4,
        text:'Play With Children/Grandchildren',
        value:'PLAY_WITH_GRANDCHILDREN'
    },
]

// const vegetableIcon = require('./../assets/icons/vegetable.png');
// const fruitIcon = require('./../assets/icons/apple.png');
// const mobileIcon = require('./../assets/icons/mobile.png');
// const dropIcon = require('./../assets/icons/drop.png');
// const boxIcon = require('./../assets/icons/box.png');
// const meatIcon = require('./../assets/icons/meat.png');

const pbsData = [
    {
        title:'Eat More Fruit',
        key:'EAT_MORE_FRUIT',
            list:[
                {
                    id:1,
                    title:'Snacks',
                    body:'Keep a bowl of your favorite fruit in plain sight for easy snacking.'
                },
                {
                    id:2,
                    title:'Variety',
                    body:'Buy fruits that are dried, frozen, and canned( in water or 100% juice), in addition to fresh so that you always have a variety for snacks or meals.'
                },
                {
                    id:3,
                    title:'Dessert',
                    body:'Eat fresh fruit as your dessert. Top it with vanilla Greek yogurt to add creamy texture and sweetness similar to ice cream'
                },
                {
                    id:4,
                    title:'Breakfast',
                    body:'Bowl of cereal? Use a little less cereal to make room for berries, bananas, raisins and apples. Do this for yogurt too. '
                },
                {
                    id:5,
                    title:'Drinks',
                    body:'Have frozen or dried fruit as a snack. (for example, grapes, blueberries, strawberries and cherries, and dried fruit like apricots, peaches and apples)'
                },
            ]
    },
    {
        title:'Eat More Vegetables',
        key:'EAT_MORE_VEGETABLES',
            list:[
                {
                    id:1,
                    title:'Half the plate',
                    body:'Make half your plate non-starchy vegetables (like asparagus, broccoli, cucumber, spinach, mushrooms, peppers, and tomatoes), either mixing extra into dishes like fajitas, spagetti sauces, or omlettes, or as sides.'
                },
                {
                    id:2,
                    title:'Veggie centered meal',
                    body:'Declare one night a week as “stir-fry” or "main dish salad" night. This is a great way to consume a larger-than-normal portion of vegetables, deliciously'
                },

                {
                    id:3,
                    title:'Double up',
                    body:'Double your “token” portion of vegetables at dinner and you’re up again'
                },

                {
                     id:4,
                    title:'ALWAYS add a vegetable',
                    body:'with every snack and every meal. Add carrot sticks to cheese and crackers. Put spinach and tomatoes on your ham and cheese sandwiches. Throw some peppers and mushrooms into your scrambled eggs for breakfast.'
                },

                {
                      id:5,
                    title:'Drinks',
                    body:'Try making yourself blended fruit and veggie drinks, such as adding spinach or kale to an apple and kiwi shake, or mixing blueberries, bananas and spinach. You can make these either water or milk based, and can even add some lowfat, low sugar vanilla yogurt to make them sweeter or avocado to make it creamier.'
                },
            ]
    },
    {
        title:'Move More',
        key:'MOVE_MORE',
            list:[
                {
                    id:1,
                    title:'It\'s not just exercise!',
                    body:'Even if you don\'t like "exercise" there are ways to be active. Gardening, running around with kids, mowing the lawn, and vacuuming are all movement. So instead of putting off those activites make an effort to spend more time each week doing them.'
                },
                {
                    id:2,
                    title:'Every step counts',
                    body:'Park a little further from work, grocery store and other places you go. Take the stairs instead of the elevator. Take a walk around the block before or after work, or before or after dinner, or take your dog for a stroll through the park.'
                },
                {
                    id:3,
                    title:'Mini breaks',
                    body:'The whole 30 minutes doesn\'t have to be all together. You can even walk 10 3 minute walks! Set a timer every hour to get up and walk around for 3-5 minutes. This increases your circulation and gets some extra steps in'
                },
                {
                     id:4,
                    title:'Get into a exercise routine',
                    body:'Pick your favorite activity like walking, running, swimming, dancing, or playing basketball, and commit to set days and times to do it for at lesat 30 minutes'
                },
                {
                      id:5,
                    title:'Get out into nature',
                    body:'Walking, tossing the frisbee, hiking, swimming, sailing, paddleboarding, canoing, kayaking, hunting, golfing, and more, are all activities that require a lot of movement.Try to get out into nature at least one day a week'
                }
            ]
    },
    {
        title:'Drink More Water',
        key:'DRINK_MORE_WATER',
            list:[
                {
                    id:1,
                    title:'Starting the day',
                    body:'Drink a glass of water when you first wake up in the morning and before each meal to start off the day with a hyrdation boost and to quench your apetite a meal times'
                },
                {
                    id:2,
                    title:'Bubbles!',
                    body:'Choose sparkling water over soda, or even choose sparkling water or plain water if you just need a lift'
                },
                {
                    id:3,
                    title:'Hydration breaks',
                    body:'Set a timer for every hour to drink at least 4 ounces, and always carry water with you when you go out'
                },
                {
                     id:4,
                    title:'Add Flavor',
                    body:'If you don\'t like the taste of plain water, try infusing it with fruit, lemon, herbs or veggies. Strawberry, pineapple is particularly tasty, and lemon cucumber mint is very refreshing. You can add these infusions to flat or sparkling water for extra kick, and you can prepare it in a water bottle in advance and put it in the fridge to steep and chill'
                },
                {
                      id:5,
                    title:'Keep it cold',
                    body:'Many people who don\'t like water realize it\'s a temperature issue. Make sure you always have cold water on hand either by rotating containers or bottles in your fridge, by making ice to add to it, or by freezing water bottles ahead of time to take with you to drink throughout the day'
                }
            ]
    },
    {
        title:'Eat Less Sugar ',
        key:'EAT_LESS_SUGAR',
            list:[
                {
                    id:1,
                    title:'Breakfast',
                    body:'Mix your sugary cereals with unsweetened cereals, or cut the sugary ones completely, and sweeten your cereal with fruit instead'
                },
                {
                    id:2,
                    title:'Coffee and tea time',
                    body:'Many creamers have a lot of added sugar. Try switching to plain milk, cream or plant milks, and only adding sugar yourself if you think you need it. You will add less sugar when you add it yourself, and then you can work on slowly cutting back. If you like the flavors, consider buying sugar free syrups to add yourself'
                },
                {
                    id:3,
                    title:'',
                    body:'Replace sugar with honey '
                },
                {
                     id:4,
                    title:'Bubbles!',
                    body:'Choose sparkling water over ugary sodas, and try infused bubbly drinks or make your own by adding fruit, herbs or veggies to your sparkling water'
                },
                {
                      id:5,
                    title:'Everything in moderation',
                    body:'If you really want that sweet treat, try halving the portion, and saving the rest for another day. Put your ice cream in a smaller dish, put half the slice of cake away before you even start eating it, get the smaller size of milkshake or soda, or sweet coffee treat'
                }
            ]
    },
    {
        title:'Eat Less Red, Processed and Fatty Meats',
        key:'EAT_LESS_RED_PROCESSED_AND_FATTY_MEATS',
            list:[
                {
                    id:1,
                    title:'Breakfast',
                    body:'Replace your side of pork bacon or sausage with a chicken or turkey based option, or cut the meat entirely and add plant based sausages or a side of suateed veggies'
                },
                {
                    id:2,
                    title:'Meatless Mondays',
                    body:'Try having one day a week when you don\'t eat any meat. Replace your meat with other sources of healthy proteins, such as beans and other legumes, tofu, or seitan'
                },
                {
                    id:3,
                    title:'Mix it up',
                    body:'Rather than having a whole cut of meat, such as a steak or brats with sides, try making meals that incorporate the meat into the dish, like in stir fry, fajitas, pasta dishes, or curries. This will mean more veggies and less meat per dish'
                },
                {
                     id:4,
                    title:'Lean it up',
                    body:'Choose leaner cuts of meat, trim off excess fat, and drain off excess fat when cooking'
                },
                {
                      id:5,
                    title:'Substitute',
                    body:'Try to substitute cured meats, such as bacon and salami as well as beef for chicken, turkey or fish'
                }
            ]
    },
]


export {iconLink, imageLink,vectorLink, 
    goalsList,
barrierList,
motivationsList,
vegetableIcon,
fruitIcon,
mobileIcon,
dropIcon,
boxIcon,
meatIcon,
pbsData,
recommendationList
    ,width, height, navigationOptions, colors, fontFamily, fontFamilyBold, guide_, url, url2,firebaseConfig };