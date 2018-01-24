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
  Visibility,
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
function Encounter(narratorText1, violenceText1, diplomacyText1, stealthText1, title1) {

    this.narratorText = narratorText1;
    this.violenceText = violenceText1;
    this.diplomacyText = diplomacyText1;
    this.stealthText = stealthText1;
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

var title = "1Attack";

var newEncounter = new Encounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, title);


// database is our database
var database = firebase.database();

var encounters = database.ref('encounters');


var encounterArray = [];

function createNewRandomEncounter(){

  var newNarratorText = "spleep";

  var newViolenceText = "pulk";

  var newDiplomacyText = "mork";

  var newStealthText = "nozzle";

  var title = "meep";

  var newEncounter = new Encounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, title);

return newEncounter;

}

function createNewEncounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, title) {

// constructs
var newEncounter = new Encounter(newNarratorText, newViolenceText, newDiplomacyText, newStealthText, title);
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
  //   this.test = this.test.bind(this);

     this.state = {

      narratorText: "The elves advance on you with their bows trained.",

      violence: "Pull out your machine gun and shoot them down.",

      diplomacy: "Shout praises to them.",

      stealth: "Hide in a neaby barrel",

      violenceStat: 0,

      diplomacyStat: 0,

      stealthStat: 0,

      level: 1,

      title: "0root",

      showModal: false,

      userNarrator: "A ring of angels appears before you and begins calling out your name.",

      userViolence: "Draw your sword and attack.",

      userDiplomacy: "Ask them how their day has been.",

      userStealth: "Turn and run away.",

      mostRecentChoice: "none",

      activeItem: 'editorials'

    };

     this.handleInputChange = this.handleInputChange.bind(this);
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

  // test

   testing(){
    console.log("I wish I were in shorebrook now");
  }


  setEncounterToState = (newEncounter) => this.setState({
    level: this.state.level + 1,
  narratorText: newEncounter.narratorText,
  violence: newEncounter.violenceText,
  diplomacy: newEncounter.diplomacyText,
  stealth: newEncounter.stealthText,
  title: newEncounter.title

  })

  submit = () => {

var title = nextTitle(this.state.title, this.state.level, this.state.mostRecentChoice);
console.log(title);
var ourEncounter = createNewEncounter(this.state.userNarrator, this.state.userViolence, this.state.userDiplomacy, this.state.userStealth, title);
console.log(ourEncounter);

encounters.push(ourEncounter);

this.setEncounterToState(ourEncounter);

$( ".mainIcon" ).removeClass( "ra-all-for-one" );
$(".mainIcon").addClass("ra-player-pyromaniac");

    this.setState({showModal: false});


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
  else // this is where we throw out a modal to get them to input the next encounter
  {
this.setState({ showModal: true });

  }

}

    setNewEncounter = () => this.setState({
    level: this.state.level + 1,
violenceStat: this.state.violenceStat + 1,
narratorText: newEncounter.narratorText,
violence: newEncounter.violenceText,
diplomacy: newEncounter.diplomacyText,
stealth: newEncounter.stealthText
  })



  render() {
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

          <Menu
            size='massive'
            fixed
            >
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
            <i class="ra ra-all-for-one mainIcon"></i>
              <Segment class="mainSegment" inverted >
                {this.state.narratorText}
              </Segment>
              </Segment.Group>
<br></br>

            </Container>
          </Segment>
        </Visibility>



        <Segment style={{ padding: '3em 0em' }} vertical>

        <Modal open={this.state.showModal} onHide={this.submit}>
          <Modal.Header>What Happens Next?</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>You get to choose</Header>
              <h3> Your last choice was to {this.state.mostRecentChoice}</h3>

            <Form>
    <TextArea autoHeight label="Write the Next Part" name='userNarrator' type="value" onChange={this.handleInputChange} placeholder='The goblin approaches you with a dagger in one hand and a copy of People magazine in the other.' />
    <br></br>
    <Form.Group widths='equal'>
               <Form.Field name='userViolence' type="value" onChange={this.handleInputChange} control={Input} label='Violent Choice' placeholder='Pull out your ballista...' />
               <Form.Field control={Input} name='userDiplomacy' type="value" label='Diplomatic Choice' onChange={this.handleInputChange} placeholder='Tell the goblin you like its earring...' />
               <Form.Field control={Input} name='userStealth' type="value" label='Stealthy Choice' onChange={this.handleInputChange} placeholder='Take out your cape of invisibility...' />
                       </Form.Group>

               </Form>
               <Dropdown style={{width: "100%"}} selection placeholder="Select Icon">
               <Dropdown.Menu>
                        <Dropdown.Item><i name="ra-castle-flag" class="ra ra-castle-flag"></i> Castle Flag</Dropdown.Item>
                        <Dropdown.Item><i name="ra-mirror" class="ra ra-mirror"></i>Mirror</Dropdown.Item>
                        <Dropdown.Item><i name="ra-player-teleport" class="ra ra-player-teleport"></i> Teleport</Dropdown.Item>
                        <Dropdown.Item><i name="ra-dragon" class="ra ra-dragon"></i> Shark</Dropdown.Item>
                        <Dropdown.Item><i name="ra-broken-bottle" class="ra ra-broken-bottle"></i></Dropdown.Item>
                        <Dropdown.Item><i name="ra-suckered-tentacle" class="ra ra-suckered-tentacle"></i>Tentacle</Dropdown.Item>
                      </Dropdown.Menu>
                </Dropdown>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button style={{float: "left"}} primary onClick={()=> this.setState({showModal: false})}>
               <Icon fitted name='remove' />
            </Button>
            <Button primary onClick={this.submit}>
              Submit <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>

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
                      {this.state.violence}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => this.choose('attack')} >Choose</Button>
                    </div>
                  </Card.Content>
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
                    {this.state.diplomacy}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => this.choose('diplomacy')} >Choose</Button>
                    </div>
                  </Card.Content>
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
                    {this.state.stealth}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => this.choose('stealth')}>Choose</Button>
                    </div>
                  </Card.Content>
                </Card>


              </Card.Group>

</center>
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


            </Grid.Row>
          </Grid>



        </Segment>


      </div>
    )
  }
}
