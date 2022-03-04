# CocBot

## Description

CocBot is a discord bot used for Clash of Clans clans to automatically authenticate joining users and have integration with CoC's api to view helpful statistics on the state of the game including player and clan details

## Server Setup

For discord server owners, CocBot requires some setup in order to get running properly. Use /clan-settings in discord for a guided walkthrough. It requires you to set your clan's tag for use in the server. It also requires one to set up a default role to which authenticated users will receive upon verification. Each three roles in Clash of Clans default roles are required during settings creation, so you have the option to give members default roles based on their in game details. This allows for automatic setting of player roles. It is required to give each game role a discord role, but it is up to the server owner to implement the roles and restrict server permissions, they can all be the same role if desired. Only server **owners** can run this command.

## Special thanks

This bot makes heavy use of the <https://github.com/clashperk/clashofclans.js> package for interacting with Clash of Clans. Special thanks to them for making it significantly easier to work with. Thanks!

## Contributing

To contribute, you are welcome to identify any bugs and submit an issue. Alternatively, submit a pull request to fix it! 

## Translating

Another way to contribute is by translating the **lang** directory. Then submit a pull request. Doing so allows us to internationalize the app for multiple languages!
