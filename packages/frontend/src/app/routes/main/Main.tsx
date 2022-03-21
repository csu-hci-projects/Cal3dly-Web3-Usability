import React, { FC, ReactElement, useCallback, useContext, useEffect, useState } from 'react';

import '~~/styles/main-page.css';

import { ethers } from 'ethers';

import { MainPageHeader } from './components';
import { useAppProviders } from '~~/app/routes/main/hooks/useAppProviders';
import { useEthersContext } from 'eth-hooks/context';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { ThemeSwitcher } from '~~/app/common';

export const DEBUG = false;

export const Main: FC = () => {
  const appProviders = useAppProviders();
  const ethersContext = useEthersContext();
  const appContractConfig = useAppContracts();

  return (
    <div className="App">
      <MainPageHeader appProviders={appProviders} />
      <ThemeSwitcher />
    </div>
  );
};

export default Main;
