// __tests__/MonsterList.test.js

import React from 'react';
import MonsterList from '../components/MonsterList';
import {render, waitFor} from "@testing-library/react-native";

jest.mock('axios');

describe('MonsterList', () => {
    test('renders the MonsterList component', async () => {
        render(<MonsterList/>);

        expect(screen.getByText(/search monsters/i)).toBeTruthy();
        await waitFor(() => expect(screen.getByText(/goblin/i)).toBeTruthy());
    });
});
