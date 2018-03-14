/*

VENTURE
A CROWD SOURCED CHOOSE YOUR OWN ADVENTURE
WRITTEN BY DANIEL OLIVIERI
THANKS TO RPG AWESOME, SEMANTIC UI, FIREBASE, PROFESSOR LAURIE FINKE, CALEB DIXON

*/
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  List,
  Menu,
  Segment,
  Tab,
  Form,
  Select,
  TextArea,
  Card,
  Modal,
  Statistic,
  Visibility
} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
/*
import {
  Tooltip,
} from 'react-tippy';
*/
import './App.css'

import $ from 'jquery'


import {MenuExampleBasic} from './MenuExampleBasic'
import Iconpicker from './pickIcon'

import * as firebase from 'firebase'

//import './ModalScrolling'

// set up firebase
function setup() {
  var config = {
    apiKey: "AIzaSyBO2nChGpjC9nXjgxiceNj8RcuUb4tJL74",
    authDomain: "venture-34bcf.firebaseapp.com",
    databaseURL: "https://venture-34bcf.firebaseio.com",
    projectId: "venture-34bcf",
    storageBucket: "venture-34bcf.appspot.com",
    messagingSenderId: "796085810718"
  };
  firebase.initializeApp(config);
  console.log(firebase);
}

setup(); // sets up the firebase

// prototype for an encounter
function Encounter(narratorText1, violenceText1, diplomacyText1, stealthText1, icon1, title1) {

    this.narratorText = narratorText1;
    this.violenceText = violenceText1;
    this.diplomacyText = diplomacyText1;
    this.stealthText = stealthText1;
    this.nextMainIcon = icon1;
    this.title = title1;
}

// we use this to hold the data we get from the modal box
function UserInput(narratorText1, violenceText1, diplomacyText1, stealthText1){
  this.narratorText = narratorText1;
  this.violenceText = violenceText1;
  this.diplomacyText = diplomacyText1;
  this.stealthText = stealthText1;
}

// create new title along the specific guidlines

  function nextTitle(currentTitle, level, choice) {
    return currentTitle + level + choice;
  }

var newNarratorText = "A kobold throws an obsidian tipped spear at you.";

var newViolenceText = "Dodge and shoot back with a crossbow.";

var newDiplomacyText = "Tell him he will be sorry";

var newStealthText = "Summon a ring of darkness around yourself.";

var icon = "ra-castle-flag";

var title = "1Attack";

var newEncounter = new Encounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, icon, title);


// database is our database
var database = firebase.database();

var encounters = database.ref('newEncounters');


var encounterArray = [];

function createNewRandomEncounter(){

  var newNarratorText = "spleep";

  var newViolenceText = "pulk";

  var newDiplomacyText = "mork";

  var newStealthText = "nozzle";
  
  var icon = "ra-castle-flag";

  var title = "meep";

  var newEncounter = new Encounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, icon, title);

return newEncounter;

}

function createNewEncounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, icon, title) {

// constructs
var newEncounter = new Encounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, icon, title);
// returns
return newEncounter;

}

var nextEncounterIndex; // holds the index of where the next encounter is held


function ifNextEncounter(nextTitle){
  //console.log(encounterArray);
console.log(encounterArray);
  for (var i = 0; i < encounterArray.length; i++){
  console.log(encounterArray[i].title);
  console.log(nextTitle);
  if(encounterArray[i].title == nextTitle) {
    console.log(encounterArray[i].title);
    nextEncounterIndex = i;
    return true;
  }
  }
  return false;

}

//encounters.push(createNewRandomEncounter());

// create new array on state change

encounters.ref.on("value", gotData, errData);


function gotData(data) {
console.log(data.val());
if(data.val() != null ){
  var encounters = data.val();
  // Grab the keys to iterate over the object
  var keys = Object.keys(encounters);

  var key = keys[0];


  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // Look at each fruit object!
    encounterArray[i] = encounters[key];
}

  }

}

function errData(){
  console.log("There was an error.");
}


const FixedMenu = () => (
  <Menu fixed='top' size='large'>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
      <Menu.Item as='a'>Work</Menu.Item>
      <Menu.Item as='a'>Company</Menu.Item>
      <Menu.Item as='a'>Careers</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          <Button as='a'>Log in</Button>
        </Menu.Item>
        <Menu.Item>
          <Button as='a' primary>Sign Up</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)

// for tabs
const panes = [
{ menuItem: 'Tab 1', pane: 'Tab 1 Content' },
{ menuItem: 'Tab 2', pane: 'Tab 2 Content' },
{ menuItem: 'Tab 3', pane: 'Tab 3 Content' },
]

export default class HomepageLayout extends Component {

constructor(props){
  super(props);

  
     this.state = {

      narratorText: "You are... well, that's up to you. Maybe you're a goblin merchant named Jennifer or maybe you're a half dragon half orc psychologist. It's up to you. What's not quite so up to you is that there are three human beings in front of you and three swords as well. The humans are carrying the swords (not the other way around) and they seem quite ready to fight you.",

      violence: "Pull out the +2 short sword you got from a relative (perhaps an aunt or second cousin twice removed or second aunt once removed) and proceed to start stabbing these humans left and right and then left again.",

      diplomacy: "Praise their good looks and ability to accessorize. Then offer to buy them a flask of ale.",

      stealth: "Throw down a smoke bomb you made yourself (you learned to make smoke bombs from a How to be a Rogue self-help book) and then hide in a neaby barrel.",

      violenceStat: 0,

      diplomacyStat: 0,

      stealthStat: 0,

      level: 1,

      title: "0root",

      showCreate: false,

      showPlay: true,

      userNarrator: "A ring of angels appears before you and begins calling out your name.",

      userViolence: "Draw your sword and attack.",

      userDiplomacy: "Ask them how their day has been.",

      userStealth: "Turn and run away.",

      mostRecentChoice: "none",

      mostRecentAction: "Stab them",

      activeItem: 'editorials',

      currentMainIcon: 'ra-all-for-one',

      nextMainIcon: 'ra-all-for-one',

      newViolence: "",
      
      newDiplomacy: "",
      
      newStealth: "",
      
      newNarration: "Your choice here..."

    };

}

returnPreviousAction(){
  if (this.state.mostRecentChoice == 'attack')
  {
    this.setState({ mostRecentAction: this.state.violence })
    return this.state.violence;
  }
  else if (this.state.mostRecentChoice == 'diplomacy')
  {
    this.setState({ mostRecentAction: this.state.diplomacy })
    return this.state.diplomacy;
  }
  else
  {
    this.setState({ mostRecentAction: this.state.stealth })
    return this.state.stealth;
  }
}

handleInputChange(event) {
   const target = event.target;
   const value = target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });

 }

 handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })


  setEncounterToState = (newEncounter) => this.setState({
    level: this.state.level + 1,
  narratorText: newEncounter.narratorText,
  violence: newEncounter.violenceText,
  diplomacy: newEncounter.diplomacyText,
  stealth: newEncounter.stealthText,
  nextMainIcon: newEncounter.nextMainIcon,
  title: newEncounter.title

  })

  submit = () => {

var title = nextTitle(this.state.title, this.state.level, this.state.mostRecentChoice);
console.log(title);
var ourEncounter = createNewEncounter(this.state.newNarration, this.state.newViolence, this.state.newDiplomacy, this.state.newStealth, this.state.nextMainIcon, title);
console.log(ourEncounter);

encounters.push(ourEncounter);

this.setEncounterToState(ourEncounter);

    this.setState({showCreate: false    });
  }

  choose = (choiceType) => {

console.log(choiceType);
// right off the bat, let's pump up the violence stat by once
// you know, to get it out of the way early
    this.setState({
    mostRecentChoice: choiceType
  })

  console.log(this.state.mostRecentChoice);

  if(choiceType == 'attack'){
    this.setState({
    violenceStat: this.state.violenceStat + 1
  })
  }
  else if (choiceType == 'diplomacy'){
    this.setState({
    diplomacyStat: this.state.diplomacyStat + 1
  })
  }
  else {
    this.setState({
    stealthStat: this.state.stealthStat + 1
  })
  }

  this.returnPreviousAction();

  //  now let's find the title that our next encounter will have, if it exists
  var title = nextTitle(this.state.title, this.state.level, choiceType);
  console.log(title);
  console.log(encounterArray);

  console.log(ifNextEncounter(title));

//this determines if there is a next encounter
  if(ifNextEncounter(title))
  //if there is a next encounter
  {
    console.log(encounterArray[nextEncounterIndex]);

    this.setEncounterToState(encounterArray[nextEncounterIndex]);


  }
  else // this is where we put out inputs for the user to input their next step
  {
this.setState({

  showCreate: true

});

  }

}

    setNewEncounter = () => this.setState({
    level: this.state.level + 1,
violenceStat: this.state.violenceStat + 1,
narratorText: newEncounter.narratorText,
violence: newEncounter.violenceText,
diplomacy: newEncounter.diplomacyText,
nextMainIcon: newEncounter.nextMainIcon,
stealth: newEncounter.stealthText
  })
  
  //for data binding when user is writing in their new ideas
  
  // for violence
  handleChangeViolence = (e) => {
    this.setState({newViolence: e.target.value});
  }
  // for diplomacy
  handleChangeDiplomacy = (e) => {
    this.setState({newDiplomacy: e.target.value});
  }
  // for stealth
  handleChangeStealth = (e) => {
    this.setState({newStealth: e.target.value});
  }
  // for narrator
  handleChangeNarration = (e) => {
    this.setState({newNarration: e.target.value});
  }
  

  render() {
    
    var handleChangeIcon = this.handleChangeIcon;
    
    const { visible } = this.state

    return (
      <div>


        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 500, padding: '0em 0em', background: '#e63e26' }}
            vertical
          >

          <Menu size='massive' fixed>
                  <Menu.Item
                    name='editorials'

                    onClick={this.handleItemClick}
                  >
                    Top
                  </Menu.Item>

                  <Menu.Item
                    name='reviews'

                    onClick={this.handleItemClick}
                  >
                    Choices
                  </Menu.Item>

                  <Menu.Item
                    name='upcomingEvents'

                    onClick={this.handleItemClick}
                  >
                    Stats
                  </Menu.Item>
                  <Menu.Item
                    name='what'

                    onClick={this.handleItemClick}
                  >
                    What is this?
                  </Menu.Item>
                </Menu>

            <Container text style={{}} >
              <Header
                as='h1'
                content='Adventure'
                inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '.5em' }}
              />
              <Segment.Group class="mainGroup" inverted>
            <i class={"ra " + this.state.nextMainIcon + " mainIcon"}></i>
            
          { !this.state.showCreate ?    <Segment class="mainSegment play" inverted >  {this.state.narratorText} </Segment> : null }
          
          { this.state.showCreate ?    <Segment class="mainSegment play" inverted >  {this.state.newNarration} </Segment> : null }
              <Form>
  { this.state.showCreate ? <TextArea class="create" placeholder='What Happens Next?' style={{ minHeight: 100 }} onChange={this.handleChangeNarration} /> : null }
  </Form>
  { this.state.showCreate ? <Dropdown class="create" style={{width: "100%"}} selection placeholder="Select Icon">
  <Dropdown.Menu>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-castle-flag' })} value="ra-castle-flag"><i name="ra-castle-flag" class="ra ra-castle-flag"></i> Castle Flag</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-mirror' })}><i name="ra-mirror" class="ra ra-mirror"></i> Mirror</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-player-teleport' })}><i name="ra-player-teleport" class="ra ra-player-teleport"></i> Teleport</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-dragon' })}><i name="ra-dragon" class="ra ra-dragon"></i> Dragon</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-shark' })}><i name="ra-shark" class="ra ra-shark"></i> Shark</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-player-shot' })}><i name="ra-player-shot" class="ra ra-player-shot"></i> Shot With Arrows</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-broken-bottle' })}><i name="ra-broken-bottle" class="ra ra-broken-bottle"></i> Broken Bottle</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-suckered-tentacle' })}><i name="ra-suckered-tentacle" class="ra ra-suckered-tentacle"></i> Tentacle</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-eye-monster' })}><i name="ra-eye-monster" class="ra ra-eye-monster"></i> Eye Monster</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-decapitation' })}><i name="ra-decapitation" class="ra ra-decapitation"></i> Decapitation</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-focused-lightning' })}><i name="ra-decapitation" class="ra ra-focused-lightning"></i> Lightning</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-honeycomb' })}><i name="ra-decapitation" class="ra ra-honeycomb"></i> Honeycomb</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-burning-meteor' })}><i name="ra-decapitation" class="ra ra-burning-meteor"></i> Fireball</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-fire' })}><i name="ra-decapitation" class="ra ra-fire"></i> Fire</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-dragon-breath' })}><i name="ra-decapitation" class="ra ra-dragon-breath"></i> Dragon Breath</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-gold-bar' })}><i name="ra-gold-bar" class="ra ra-gold-bar"></i> Gold Bar</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-frostfire' })}><i name="ra-decapitation" class="ra ra-frostfire"></i> Frostfire</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-arcane-mask' })}><i name="ra-decapitation" class="ra ra-arcane-mask"></i> Arcane Mask</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-chain' })}><i name="ra-chain" class="ra ra-chain"></i> Chain</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-scythe' })}><i name="ra-decapitation" class="ra ra-scythe"></i> Scythe</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-tower' })}><i name="ra-decapitation" class="ra ra-tower"></i> Tower</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-hood' })}><i name="ra-decapitation" class="ra ra-hood"></i> Hood</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-meat' })}><i name="ra-meat" class="ra ra-meat"></i> Meat</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-monster-skull' })}><i name="ra-monster-skull" class="ra ra-monster-skull"></i> Monster Skull</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-aura' })}><i name="ra-aura" class="ra ra-aura"></i> Person with Aura</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-player-dodge' })}><i name="ra-player-dodge" class="ra ra-player-dodge"></i> Dodge</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-bubbling-potion' })}><i name="ra-meat" class="ra ra-bubbling-potion"></i> Potion</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-player-thunder-struck' })}><i name="ra-player-thunder-struck" class="ra ra-player-thunder-struck"></i> Thunderstruck</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-spider-face' })}><i name="ra-aura" class="ra ra-spider-face"></i> Spider</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-archer' })}><i name="ra-player-dodge" class="ra ra-archer"></i> Archer</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-bomb-explosion' })}><i name="ra-meat" class="ra ra-bomb-explosion"></i> Explosion</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-bone-knife' })}><i name="ra-bone-knife" class="ra ra-bone-knife"></i> Bone Knife</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-daggers' })}><i name="ra-aura" class="ra ra-daggers"></i> Three Daggers</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-dripping-blade' })}><i name="ra-player-dodge" class="ra ra-dripping-blade"></i> Dripping Blade</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-grappling-hook' })}><i name="ra-grappling-hook" class="ra ra-grappling-hook"></i> Grappling Hook</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-spear-head' })}><i name="ra-spear-head" class="ra ra-spear-head"></i> Spear</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-castle-emblem' })}><i name="ra-aura" class="ra ra-castle-emblem"></i> Castle</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-cut-palm' })}><i name="ra-player-dodge" class="ra ra-cut-palm"></i> Cut Palm</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-aware' })}><i name="ra-aware" class="ra ra-aware"></i> Aware</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-vase' })}><i name="ra-vase" class="ra ra-dripping-blade"></i> Vase</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-ball' })}><i name="ra-ball" class="ra ra-grappling-hook"></i> Ball</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-key-basic' })}><i name="ra-key-basic" class="ra ra-key-basic"></i> Key</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-alien-fire' })}><i name="ra-alien-fire" class="ra ra-alien-fire"></i> Fire</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-beer' })}><i name="ra-beer" class="ra ra-cut-palm"></i> Beer</Dropdown.Item>           
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-libra' })}><i name="ra-player-dodge" class="ra ra-cut-palm"></i> Libra</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-diamond' })}><i name="ra-aware" class="ra ra-aware"></i> Diamond</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-droplet-splash' })}><i name="ra-vase" class="ra ra-dripping-blade"></i> Droplet</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-guillotine' })}><i name="ra-ball" class="ra ra-grappling-hook"></i> Guillotine</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-knight-helmet' })}><i name="ra-key-basic" class="ra ra-key-basic"></i> Helmet</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-spinning-sword' })}><i name="ra-alien-fire" class="ra ra-alien-fire"></i> Spinning Sword</Dropdown.Item>
           <Dropdown.Item onClick={()=>this.setState({nextMainIcon: 'ra-hammer-drop' })}><i name="ra-beer" class="ra ra-cut-palm"></i> Hammer Drop</Dropdown.Item>

         </Dropdown.Menu>
   </Dropdown>  : null }

              </Segment.Group>
<br></br>

            </Container>
          </Segment>
        </Visibility>


        <Segment style={{ padding: '3em 0em' }} vertical>
 


          <Grid container stackable verticalAlign='middle'>
            <Grid.Row centered>

            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '2em 0em', textTransform: 'uppercase' }}
            >
              <a>Choices</a>
            </Divider>

<center>
            <Card.Group style={{textAlign: 'left' }}>
                <Card color='black'>
                  <Card.Content>

                  <Grid columns='equal'>
                  <Grid.Row>
                  <Grid.Column>
                    <Card.Header style={{fontSize: "1.5em"}} >
                    <strong>  Attack </strong>
                    </Card.Header>
                    </Grid.Column>

                    <Grid.Column >

                      <i class="ra ra-sword ra-lg" style={{ float: 'right' }}  ></i>
                      </Grid.Column>
                    </Grid.Row>
                    </Grid>


                    <Card.Meta>
                    <p>  Increases your Violence </p>
                    </Card.Meta>
                    <Card.Description>
                  { !this.state.showCreate ?   <div> {this.state.violence} </div> : null }
                  { this.state.showCreate ?  <div> {this.state.newViolence} </div> : null }
                    </Card.Description>
                  </Card.Content>

                  { this.state.showCreate ? <Card.Content extra>
                     <Input focus style={{width: "100%"}} placeholder='Violent response...' onChange={this.handleChangeViolence} />
                    </Card.Content> : null }

                  { !this.state.showCreate ?
                  <Card.Content extra>

                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => this.choose('attack')} >Choose</Button>
                    </div>
                  </Card.Content>
                  : null }
                </Card>

                <Card color='black'>
                  <Card.Content>

                  <Grid columns='equal'>
                  <Grid.Row>
                  <Grid.Column>
                    <Card.Header style={{fontSize: "1.5em"}} >
                    <strong>  Talk </strong>
                    </Card.Header>
                    </Grid.Column>

                    <Grid.Column >

                      <i class="ra ra-scroll-unfurled ra-lg" style={{ float: 'right' }}  ></i>
                      </Grid.Column>
                    </Grid.Row>
                    </Grid>

                    <Card.Meta>
                      Increases your Diplomacy
                    </Card.Meta>
                    <Card.Description>
                    { !this.state.showCreate ?   <div> {this.state.diplomacy} </div> : null }
                    { this.state.showCreate ?  <div> {this.state.newDiplomacy} </div> : null }
                    </Card.Description>
                  </Card.Content>
                  { this.state.showCreate ? <Card.Content extra>
                     <Input focus style={{width: "100%"}} placeholder='Diplomatic response...' onChange={this.handleChangeDiplomacy} />
                    </Card.Content> : null }
                    
                  { !this.state.showCreate ?
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => this.choose('diplomacy')} >Choose</Button>
                    </div>
                  </Card.Content> : null }
                                </Card>
                <Card color='black'>
                  <Card.Content>

                  <Grid columns='equal'>
                  <Grid.Row>
                  <Grid.Column>
                    <Card.Header style={{fontSize: "1.5em"}} >
                    <strong>  Escape </strong>
                    </Card.Header>
                    </Grid.Column>

                    <Grid.Column >

                      <i class="ra ra-nuclear ra-lg" style={{ float: 'right' }}  ></i>
                      </Grid.Column>
                    </Grid.Row>
                    </Grid>

                    <Card.Meta>
                      Increases your Stealth
                    </Card.Meta>
                    <Card.Description>
                    { !this.state.showCreate ?   <div> {this.state.stealth} </div> : null }
                    { this.state.showCreate ?  <div> {this.state.newStealth} </div> : null }
                    </Card.Description>
                  </Card.Content>
                  
                  { this.state.showCreate ? <Card.Content extra>
                     <Input focus style={{width: "100%"}} placeholder='Stealth response...' onChange={this.handleChangeStealth} />
                    </Card.Content> : null }
                  
                  { !this.state.showCreate ?
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => this.choose('stealth')}>Choose</Button>
                    </div>
                  </Card.Content> : null}
                </Card>


              </Card.Group>            
              

</center>
            </Grid.Row>
            <Grid.Row centered>
            { this.state.showCreate ?
            <Button primary color="red" size="large" onClick={this.submit} >Submit</Button> : null}
            </Grid.Row>
            <Grid.Row>

            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '2em 0em', textTransform: 'uppercase' }}
            >
              <a>Character Stats</a>
            </Divider>
</Grid.Row>

<Grid.Row centered>

<Segment.Group horizontal>

   <Segment><Statistic>
       <Statistic.Value>{this.state.violenceStat}</Statistic.Value>
       <Statistic.Label><i class="ra ra-sword ra-3x"></i></Statistic.Label>

     </Statistic></Segment>


   <Segment><Statistic>
     <Statistic.Value>{this.state.diplomacyStat}</Statistic.Value>
     <Statistic.Label><i class="ra ra-scroll-unfurled ra-3x"></i></Statistic.Label>

   </Statistic></Segment>
   <Segment><Statistic>
     <Statistic.Value>{this.state.stealthStat}</Statistic.Value>
     <Statistic.Label><i class="ra ra-nuclear ra-3x"></i></Statistic.Label>
   </Statistic></Segment>
 </Segment.Group>

 <Divider
   as='h4'
   className='header'
   horizontal
   style={{ margin: '2em 0em', textTransform: 'uppercase' }}
 >
   <a>Credits</a>
 </Divider>

            </Grid.Row>
<Grid.Row columns="equal" >
<Segment inverted style={{ width: "100%" }}>
Thank you to: the people at RPGAwesome, Semantic UI, FIREBASE, React, Caleb Dixon, and professor Finke.
</Segment>
</Grid.Row>


          </Grid>



        </Segment>


      </div>
    )
  }
}
