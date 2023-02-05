import React from 'react';
import { nanoid } from 'nanoid';
import { FaTshirt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.min.css';
import { Slide, ToastContainer } from 'react-toastify';
import { Button, ButtonsBlock, Container } from './App.styled';

export const App = () => {
  const [state, setState] = React.useState([
    {
      id: nanoid(),
      color: 'black',
      players: 0,
      maxPlayers: 0,
    },
  ]);
  console.log('state', state);
  const [colors, setColors] = React.useState([]);
  React.useEffect(() => {
    const newColors = state.map(item => {
      if (item.maxPlayers === item.players) {
        return null;
      } else return item.color;
    });
    setColors(newColors);
  }, [state]);

  const handleGetColorClick = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const chosenColor = colors[randomNumber];

    const allDone = colors.every(item => item === null);
    if (allDone) {
      return;
    }

    if (chosenColor === null) {
      return handleGetColorClick(min, max);
    }

    // toast.success(chosenColor, {});

    const newArray = state.map(item => {
      if (item.color === chosenColor) {
        return { ...item, players: (item.players += 1) };
      } else return item;
    });
    setState([...newArray]);
  };

  const handleAddClick = () => {
    return setState(prevState => {
      return [
        ...prevState,
        {
          id: nanoid(),
          color: 'black',
          players: 0,
          maxPlayers: 0,
        },
      ];
    });
  };

  const handleDeleteClick = () => {
    const newArray = state.filter((item, index) => {
      return index !== state.length - 1;
    });
    setState(newArray);
  };

  const handleChange = (index, key) => e => {
    const newArray = state.map((item, i) => {
      if (i === index) {
        if (key === 'maxPlayers') {
          return { ...item, [key]: +e.target.value };
        } else {
          return { ...item, [key]: e.target.value };
        }
      } else return item;
    });
    setState([...newArray]);
  };

  const disabledButton =
    colors.every(color => color === null) ||
    state.some(color => color.maxPlayers < color.players);

  return (
    <Container
      style={{
        height: '100vh',
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar={false}
        newestOnTop={false}
        theme={'colored'}
        transition={Slide}
        closeOnClick
      />
      <ul style={{ outline: '2px solid red' }}>
        {state.length === 0 ? (
          <p>No teams</p>
        ) : (
          state.map((item, index) => {
            return (
              <li key={item.id}>
                <FaTshirt color={item.color} size={30} />
                <div
                  style={{
                    // borderRadius: '50%',
                    border: '1px solid red',
                    width: '20px',
                  }}
                >
                  {item.players}
                </div>
                <input
                  placeholder="Color"
                  value={item.color}
                  onChange={handleChange(index, 'color')}
                />
                <input
                  placeholder="Maximum players"
                  type="number"
                  value={Number(item.maxPlayers).toString()}
                  onChange={handleChange(index, 'maxPlayers')}
                />
              </li>
            );
          })
        )}
      </ul>
      <button
        type="button"
        onClick={() => handleGetColorClick(0, colors.length - 1)}
        disabled={disabledButton}
      >
        Get color
      </button>
      <ButtonsBlock>
        <Button type="button" onClick={handleAddClick}>
          +
        </Button>
        <Button type="button" onClick={handleDeleteClick}>
          -
        </Button>
      </ButtonsBlock>
    </Container>
  );
};
