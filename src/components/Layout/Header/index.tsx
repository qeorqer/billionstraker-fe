import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePwa } from '@dotmind/react-use-pwa';
import {
  Container,
  Grid,
  Anchor,
  Box,
  Image,
  Title,
  Menu,
  Burger,
  List,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHeadset,
  IconWallet,
  IconTag,
  IconBook,
  IconDeviceTabletDown,
  IconLogout,
  Icon,
  IconProps,
} from '@tabler/icons-react';

import logo from 'assets/common/logo.png';
import { useAppDispatch } from 'store/hooks';
import LanguageSwitcher from 'components/Shared/LanguageSwitcher';
import { logOutThunk } from 'features/user';

import styles from './styles.module.css';
import { tabMenuItems } from './constants';

type DropdownMenuItem = {
  title: string;
  onClick: () => void;
  isShown: boolean;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

const Header = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [opened, { toggle }] = useDisclosure();

  const { installPrompt, canInstall } = usePwa();

  const handleLogout = () => {
    dispatch(logOutThunk());
    history.push('/authorization');
  };

  const dropdownMenuItems: DropdownMenuItem[] = [
    {
      title: 'balances',
      onClick: () => history.push('/balance'),
      isShown: true,
      Icon: IconWallet,
    },
    {
      title: 'categories',
      onClick: () => history.push('/category'),
      isShown: true,
      Icon: IconTag,
    },
    {
      title: 'usage guide',
      onClick: () => history.push('/guide'),
      isShown: true,
      Icon: IconBook,
    },
    {
      title: 'Support',
      onClick: () => window.open('https://t.me/qeorqe', '_blank'),
      isShown: true,
      Icon: IconHeadset,
    },
    {
      title: 'install PWA',
      onClick: installPrompt,
      isShown: canInstall,
      Icon: IconDeviceTabletDown,
    },
    {
      title: 'Log out',
      onClick: handleLogout,
      isShown: true,
      Icon: IconLogout,
    },
  ];

  return (
    <Box
      component="header"
      bg="dark"
      py={{ base: 10, sm: 15 }}
      style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}>
      <Container size="lg">
        <Grid align="center">
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Title order={1} style={{ display: 'flex', alignItems: 'center' }}>
              <Anchor
                component={NavLink as any}
                to="/"
                underline="never"
                c="primary"
                display="inline-flex"
                fw={700}
                style={{ width: '100%', alignItems: 'center' }}>
                <Image src={logo} alt="app logo" maw={30} mr={5} />
                Billionstracker
              </Anchor>
            </Title>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 6 }}
            order={{ base: 1, md: 0 }}
            className={styles.menu}>
            <List>
              {tabMenuItems.map(({ title, Component, link }) => (
                <li key={title}>
                  <Anchor
                    component={NavLink as any}
                    to={link}
                    underline="never"
                    activeClassName={styles.active}>
                    <Component />
                    {t(title)}
                  </Anchor>
                </li>
              ))}
            </List>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }} ta="right">
            <Menu
              opened={opened}
              onChange={toggle}
              position="bottom-end"
              shadow="md"
              transitionProps={{
                transition: 'fade-down',
                duration: 150,
              }}>
              <Menu.Target>
                <Burger
                  size="md"
                  color="primary"
                  opened={opened}
                  onClick={toggle}
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Box component="li" py={5} style={{ listStyle: 'none' }}>
                  <LanguageSwitcher />
                </Box>
                <Menu.Divider />
                {dropdownMenuItems
                  .filter(({ isShown }) => isShown)
                  .map(({ title, Icon, onClick }) => (
                    <Menu.Item
                      key={title}
                      onClick={onClick}
                      leftSection={<Icon size={20} />}>
                      {t(title)}
                    </Menu.Item>
                  ))}
              </Menu.Dropdown>
            </Menu>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
