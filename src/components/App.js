import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check_0: true,
            check_1: false,
            check_2: false,
            check_3: false,
            room0Children: 0,
            room1Children: 0,
            room2Children: 0,
            room3Children: 0,
            room0Adults: 1,
            room1Adults: 1,
            room2Adults: 1,
            room3Adults: 1,
            rooms: [
                {name: 'Room 1'},
                {name: 'Room 2'},
                {name: 'Room 3'},
                {name: 'Room 4'}
            ],
            adult: [1, 2],
            children: [0, 1, 2]
        }

        this.handleCheck = this.handleCheck.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('check_0', JSON.stringify(nextState.check_0))
        localStorage.setItem('check_1', JSON.stringify(nextState.check_1))
        localStorage.setItem('check_2', JSON.stringify(nextState.check_2))
        localStorage.setItem('check_3', JSON.stringify(nextState.check_3))
        localStorage.setItem('room0Children', JSON.stringify(nextState.room0Children))
        localStorage.setItem('room1Children', JSON.stringify(nextState.room1Children))
        localStorage.setItem('room2Children', JSON.stringify(nextState.room2Children))
        localStorage.setItem('room3Children', JSON.stringify(nextState.room3Children))
        localStorage.setItem('room0Adults', JSON.stringify(nextState.room0Adults))
        localStorage.setItem('room1Adults', JSON.stringify(nextState.room1Adults))
        localStorage.setItem('room2Adults', JSON.stringify(nextState.room2Adults))
        localStorage.setItem('room3Adults', JSON.stringify(nextState.room3Adults))

    }

    componentDidMount(){
        const check0 = localStorage.getItem("check_0")
        const check1 = localStorage.getItem("check_1")
        const check2 = localStorage.getItem("check_2")
        const check3 = localStorage.getItem("check_3")
        const child0 = localStorage.getItem("room0Children")
        const child1 = localStorage.getItem("room1Children")
        const child2 = localStorage.getItem("room2Children")
        const child3 = localStorage.getItem("room3Children")
        const adult0 = localStorage.getItem("room0Adults")
        const adult1 = localStorage.getItem("room1Adults")
        const adult2 = localStorage.getItem("room2Adults")
        const adult3 = localStorage.getItem("room3Adults")


        if (check0 === '' || check1 === '' || check2 === '' || check3 === '' || child0 === ''
            || child1 === '' || child2 === '' || adult1 === '' || adult2 === ''){
            return
        }

        this.setState({
            check_0: JSON.parse(check0),
            check_1: JSON.parse(check1),
            check_2: JSON.parse(check2),
            check_3: JSON.parse(check3),
            room0Children: JSON.parse(child0),
            room1Children: JSON.parse(child1),
            room2Children: JSON.parse(child2),
            room3Children: JSON.parse(child3),
            room0Adults: JSON.parse(adult0),
            room1Adults: JSON.parse(adult1),
            room2Adults: JSON.parse(adult2),
            room3Adults: JSON.parse(adult3)
        })
    }

    handleCheck = (i, event) => {
        const target = event.target
        const value =  target.checked

        for(let j=0;j<this.state.rooms.length;j++){
            this.setState({
                ['check_'+j]:(j < i && j !== 0)
            })
        }
        this.setState({
            ['check_'+i]:value
        })
    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
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
            margin: 20px 0 20px 0;
            display: block;
            &:hover{
                cursor: pointer;
            }
        `;

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <Container >
                        <Form
                            id="guests"
                            onSubmit={this.handleSubmit}>
                            {this.state.rooms.map((room, i) =>
                                (i === 0) || this.state['check_'+i] ?
                                    <Box active>
                                        <BoxHeader active>
                                            {(i !== 0) ?
                                                <div>
                                                    <CheckBox
                                                        name={'check_'+i}
                                                        defaultChecked={this.state['check_'+i]}
                                                        onClick={this.handleCheck.bind(this,i)}
                                                    />
                                                    {room.name}
                                                </div> : room.name}
                                        </BoxHeader>
                                        <OptionsContainer>
                                            <AgeFilter>
                                                <h4 key={'adult_title_'+i}>Adults</h4>
                                                <h5 key={'adult_age_'+i}>(18+)</h5>
                                                <Selector
                                                    name={'room'+i+'Adults'}
                                                    value={this.state['room'+i+'Adults']}
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.adult.map(count => {
                                                        return <Option>{count}</Option>
                                                    })}
                                                </Selector>
                                            </AgeFilter>
                                            <AgeFilter>
                                                <h4 key={'child_title_'+i}>Children</h4>
                                                <h5 key={'child_age_'+i}>(0-17)</h5>
                                                <Selector
                                                    name={'room'+i+'Children'}
                                                    value={this.state['room'+i+'Children']}
                                                    onChange={this.handleChange}
                                                >
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
                                                        name={'check_'+i}
                                                        defaultChecked={this.state['check_'+i]}
                                                        onClick={this.handleCheck.bind(this,i)}
                                                    />
                                                    {room.name}
                                                </div> : room.name}
                                        </BoxHeader>
                                        <OptionsContainer>
                                            <AgeFilter>
                                                <h4 key={'adult_title_'+i}>Adults</h4>
                                                <h5 key={'adult_age_'+i}>(18+)</h5>
                                                <Selector disabled>
                                                    {this.state.adult.map(count => {
                                                        return <Option>{count}</Option>
                                                    })}
                                                </Selector>
                                            </AgeFilter>
                                            <AgeFilter>
                                                <h4 key={'child_title_'+i}>Children</h4>
                                                <h5 key={'child_age_'+i}>(0-17)</h5>
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

export default App
