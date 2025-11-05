# Zps Portfolio Web

This project is the front-end of my personal portfolio project: https://zps-portfolio-web.azurewebsites.net/

It was originally generated with angular version 16.0.2.

It is deployed to Azure App Service by connecting to a GitHub repository from the App Service's 'Deployment Center'.
The configuration of the App Service is mostly default, except for the startup command, which can be found in Settings > Stack settings.

This is the startup command:

`pm2 serve /home/site/wwwroot/dist/zps-portfolio-web/browser --no-daemon --spa`
