import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { navigationOptions } from '../utils/constant';
// Scenes
import Dashboard from '../scenes/dashboard.scene';
import Setting from '../scenes/setting.scene';
import Fruit from '../scenes/fruit.scene';
import Steps from '../scenes/steps.scene';
import Water from '../scenes/water.scene';
import Weight from '../scenes/weight.scene';
import Starter from '../scenes/starter.scene';
import Guide from '../scenes/guide.scene';
import Testing from '../scenes/testing.scene';
import Support from '../scenes/support.scene';
import MyPlans from '../scenes/myplans.scene';
import WeightScale from '../scenes/weightscale.scene';

import Goals from '../scenes/goals.scene';
import Motivations from '../scenes/motivations.scene';
import Barrier from '../scenes/barrier.scene';
import Recap from '../scenes/recap.scene';
import Recommendation from '../scenes/recommendation.scene';
import Motivation from '../scenes/motivation.scene';
import Commitment from '../scenes/commitment.scene';
import ProblemSolving from '../scenes/problemsolving.scene';
import Summary from '../scenes/summary.scene';
// Scenes

const SignedStack = createStackNavigator({
    Dashboard:{
        screen:Dashboard,
        navigationOptions: () => navigationOptions
    }, 
    Fruit:{
        screen:Fruit,
        navigationOptions: () => navigationOptions
    },  
    Steps:{
        screen:Steps,
        navigationOptions: () => navigationOptions
    },    
    Water:{
        screen:Water,
        navigationOptions: () => navigationOptions
    },  
    Weight:{
        screen:Weight,
        navigationOptions: () => navigationOptions
    },   
    Starter:{
        screen:Starter,
        navigationOptions: () => navigationOptions
    },
      
    WeightScale:{
        screen:WeightScale,
        navigationOptions: () => navigationOptions
    },
      
    Setting:{
        screen:Setting,
        navigationOptions: () => navigationOptions
    },
    Guide:{
        screen:Guide,
        navigationOptions: () => navigationOptions
    },
    Testing:{
        screen:Testing,
        navigationOptions: () => navigationOptions
    },

    MyPlans:{
        screen:MyPlans,
        navigationOptions: () => navigationOptions
    },
    Support:{
        screen:Support,
        navigationOptions: () => navigationOptions
    },

    Goals:{
        screen:Goals,
        navigationOptions: () => navigationOptions
    }, 

    Motivations:{
        screen:Motivations,
        navigationOptions: () => navigationOptions
    }, 

    Barrier:{
        screen:Barrier,
        navigationOptions: () => navigationOptions
    }, 
    Recap:{
        screen:Recap,
        navigationOptions: () => navigationOptions
    }, 
     
    Recommendation:{
        screen:Recommendation,
        navigationOptions: () => navigationOptions
    }, 

    Motivation:{
        screen:Motivation,
        navigationOptions: () => navigationOptions
    }, 

    
    Commitment:{
        screen:Commitment,
        navigationOptions: () => navigationOptions
    }, 

    ProblemSolving:{
        screen:ProblemSolving,
        navigationOptions: () => navigationOptions
    }, 
   
    Summary:{
        screen:Summary,
        navigationOptions: () => navigationOptions
    }, 
},{
    initialRouteName:'Starter'
});

export default SignedStack;