<!DOCTYPE HTML>
<html>
    <head>
        <title>OpenM-Book</title>
        {include file='include/head.tpl'}
        {include file='include/coreCSS.tpl'}
    </head>
    <body>
        {include file='include/navBar.tpl'}
        <nav id="menuMobile"></nav>
        <nav id="menuDesktop"></nav>
        <div id="loader" style="z-index: -1; position: absolute;left: 50%; top: 50%; margin-left: -16px; margin-top: -16px; ">
            <img src="{$resources_dir}OpenM-Book/gui/img/loader.gif"/>
        </div>
        <div class="container-fluid container-withmenunavigation">
            {include file='include/alert.tpl'}
            <div id="divParent"></div>
            <div id="divJSON"></div>
        </div>
        {include file='include/coreJS.tpl'}

        <script type="text/javascript">{literal}        
            $(function(){
                OpenM_URLController.loader = "loader";
                var ressource_js = "{/literal}{$resources_dir}{literal}";
                OpenM_URLController.jsLoadFinished = function(){
            {/literal}{include file='include/coreJS-initializing.tpl'}{literal}
                }                
                OpenM_URLController.jsLoad("{/literal}{$clients_js}{literal}");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/community/CommunityController.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/community/CommunityDAO.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/community/CommunityGUI.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/user/UserDAO.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/user/UserController.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/user/UserGUI.js");    
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/menuGUI.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-SSO/gui/js/OpenM_SSOClientConnectionManager.js");
                OpenM_URLController.jsLoad(ressource_js+"OpenM-Book/gui/js/CommonGUI.js");
            });{/literal}
        </script>
    </body>
</html>