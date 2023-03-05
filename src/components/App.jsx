import React from 'react';
import { nanoid } from 'nanoid';
import { FaTshirt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.min.css';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Button, ButtonsBlock, Container, MainButton } from './App.styled';

export const App = () => {
  const [state, setState] = React.useState([
    {
      id: nanoid(),
      color: '',
      players: 0,
      maxPlayers: '',
    },
  ]);
  const [colors, setColors] = React.useState([]);
  const [chosenColor, setChosenColor] = React.useState('');

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
    setChosenColor(chosenColor);

    const allDone = colors.every(item => item === null);
    if (allDone) {
      return;
    }

    if (chosenColor === null) {
      return handleGetColorClick(min, max);
    }

    toast.success(chosenColor);

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
          color: '',
          players: 0,
          maxPlayers: '',
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
    colors.some(color => color === '') ||
    state.some(color => Number(color.maxPlayers) < color.players);

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
        toastStyle={{ backgroundColor: chosenColor }}
      />
      <ul style={{ paddingLeft: 0 }}>
        {state.length === 0 ? (
          <p>No teams</p>
        ) : (
          state.map((item, index) => {
            return (
              <li key={item.id}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <FaTshirt color={item.color} size={34} />
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      fontSize: '20px',
                    }}
                  >
                    <p>
                      <span style={{ marginRight: '16px' }}>-</span>
                      {item.players} гравців
                    </p>
                  </div>
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '40px',
                    fontSize: '16px',
                    marginBottom: '24px',
                  }}
                >
                  Колір команди буде:
                  <input
                    style={{ flexGrow: 1, height: '100%', fontSize: '16px' }}
                    placeholder="Колір команди"
                    value={item.color}
                    onChange={handleChange(index, 'color')}
                  />
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    height: '40px',
                    fontSize: '16px',
                  }}
                >
                  Гравців в команді буде:
                  <input
                    style={{ flexGrow: 1, height: '100%', fontSize: '16px' }}
                    placeholder="Кількість гравців"
                    type="number"
                    value={item.maxPlayers}
                    onChange={handleChange(index, 'maxPlayers')}
                  />
                </label>
                <hr style={{ marginTop: '16px' }} />
              </li>
            );
          })
        )}
      </ul>
      <MainButton
        type="button"
        onClick={() => handleGetColorClick(0, colors.length - 1)}
        disabled={disabledButton}
      >
        Get color
      </MainButton>
      <ButtonsBlock>
        <Button type="button" onClick={handleAddClick}>
          +
        </Button>
        <Button
          type="button"
          onClick={handleDeleteClick}
          disabled={state.length === 1}
        >
          -
        </Button>
      </ButtonsBlock>
    </Container>
  );
};
