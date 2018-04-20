import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

// eslint-disable-next-line
let active = 'active'
// eslint-disable-next-line
let inactive = 'inactive'
// eslint-disable-next-line
let disabled = 'disabled'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [
                {
                    name: 'Room 1',
                    adults:1,
                    checked: true
                },
                {
                    name: 'Room 2',
                    adults:1,
                    checked: false
                },
                {
                    name: 'Room 3',
                    adults:1,
                    checked: false
                },
                {
                    name: 'Room 4',
                    adults:1,
                    checked: false
                }],
            activeArray: {
                rooms: [
                    {
                        name: 'Room 1',
                        adults:1,
                        checked: true
                    },
                    {
                        name: 'Room 2',
                        adults:1,
                        checked: false
                    },
                    {
                        name: 'Room 3',
                        adults:1,
                        checked: false
                    },
                    {
                        name: 'Room 4',
                        adults:1,
                        checked: false
                    }]
            },
            adult: [1, 2],
            children: [0, 1, 2]
        }

    }

    toggleChecked = (k) => {
        let rooms = this.state.rooms

        //set true/false mutated state until I can figure
        // out setState (enables me to move forward)
        rooms[k].checked = !rooms[k].checked

        //copy array to set checked status
        // eslint-disable-next-line
        this.state.activeArray = rooms.slice(0, k + 1)

        //loop new array & set checked status
        // eslint-disable-next-line
        this.state.activeArray.map((room) => {

            room.name !== 'Room 1' ?
                this.setState({ [room.checked]: rooms[k].checked}):
                this.setState({ [room.checked]: true })
            room.name !== 'Room 1' ? room.checked =
                rooms[k].checked : room.checked = true
        })
    }

    handleChange = (room) => (e) => {
        this.setState({[room.adults]: e.target.value})
    }

    handleSubmit(e){
        alert('Your favorite flavor is: ' + this.state.value);
        e.preventDefault();
    }

    render() {
        const theme = {
            active: {
                primary:'#FFF',
                header:'#E6E6E6',
                border:'1px solid #E6E6E6'
            },
            inactive: {
                primary:'#DBDBE3',
                header:'#DBDBE3',
                border:'1px solid #CBCFDB'
            }
         }

         const Form = styled.form`
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-flow: row nowrap;
          flex-flow: row wrap;
         `;

         const Container = styled.div`
            padding: 20px 0 0 20px;
       
         `;

        const Box = styled.div`
            width: 180px;
            height: 150px; 
            margin: 0 5px 5px 0; 
            border-radius: 5px; 
            border: ${props => props.active ? theme.active.border :
            theme.inactive.border}
        };
            background: ${props => props.active ? theme.active.primary :
            theme.inactive.primary}
        `;

        const BoxHeader = styled.div`
            display: flex;
            align-items: center;
            font-size: .9em;
            height: 20%;
            padding-left: 5px;
            background: ${props => props.active ? theme.active.header :
            theme.inactive.header}
        `;

        //figure out checkbox color
        const CheckBox = styled.input.attrs({
            type: 'checkbox'
        })`
            margin: 0 5px 0 0;
        `;

        const OptionsContainer = styled.div`
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        //figure out how to remove margin from h4 last-of-type
        const AgeFilter = styled.div`
            text-align: center;
            h4,h5{
                margin: 0 10px;
                padding-bottom: 5px;
            }
        `;

        //selectors
        const Selector = styled.select``;
        const Option = styled.option``;

        //submit
        const ButtonContainer = styled.div``;
        const Button = styled.button.attrs({
            type: 'submit'
        })`
            background: #C0C0C0;
            padding: 5px 10px;
            margin: 20px 0 0 20px;
            display: block;
            &:hover{
                cursor: pointer;
            }
        `;

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Container >
                    <Form id="guests" onSubmit={this.handleSubmit}>
                        {this.state.rooms.map((room, i) =>
                            (i === 0) || room.checked ?
                                <Box active>
                                    {console.log(room.adults)}
                                    <BoxHeader active>
                                        {(i !== 0) ?
                                            <div>
                                                <CheckBox
                                                    ref={'check_'+i}
                                                    onClick={() =>
                                                        this.toggleChecked(i)
                                                    }
                                                />
                                                {room.name}
                                            </div> : room.name}
                                    </BoxHeader>
                                    <OptionsContainer>
                                        <AgeFilter>
                                            <h4>Adults</h4>
                                            <h5>(18+)</h5>
                                            <Selector
                                                value={this.state.value}
                                                onChange={()=>this.handleChange(room)}
                                            >
                                                <Option>1</Option>
                                                <Option>2</Option>
                                            </Selector>
                                        </AgeFilter>
                                        <AgeFilter>
                                            <h4>Children</h4>
                                            <h5>(0-17)</h5>
                                            <Selector>
                                                {this.state.children.map(count => {
                                                    return <Option>{count}</Option>
                                                })}
                                            </Selector>
                                        </AgeFilter>
                                    </OptionsContainer>
                                </Box>
                                :
                                <Box inactive>
                                    <BoxHeader>
                                        {(i !== 0) ?
                                            <div>
                                                <CheckBox
                                                    ref={'check_'+i}
                                                    onClick={() =>
                                                        this.toggleChecked(i)
                                                    }
                                                />
                                                {room.name}
                                            </div> : room.name}
                                    </BoxHeader>
                                    <OptionsContainer>
                                        <AgeFilter>
                                            <h4>Adults</h4>
                                            <h5>(18+)</h5>
                                            <Selector disabled>
                                                {this.state.adult.map(count => {
                                                    return <Option>{count}</Option>
                                                })}
                                            </Selector>
                                        </AgeFilter>
                                        <AgeFilter>
                                            <h4>Children</h4>
                                            <h5>(0-17)</h5>
                                            <Selector disabled>
                                                {this.state.children.map(count => {
                                                    return <Option>{count}</Option>
                                                })}
                                            </Selector>
                                        </AgeFilter>
                                    </OptionsContainer>
                                </Box>
                        )}
                    </Form>
                    <ButtonContainer>
                        <Button
                            form="guests"
                            type="Submit">
                            Submit
                        </Button>
                    </ButtonContainer>
                </Container>
            </div>
        </ThemeProvider>
    );
  }
}

export default App;
