<!DOCTYPE HTML>
<html>
    <head>
        <title>Community</title>
        {include file='include/head.tpl'}

        <style type="text/css">
            {literal}
              /*  [class*="span"]{
                border: black solid 1px;
                background-color: lightgreen;
                margin-bottom: 10px;
                border-radius: 5px 5px 5px 5px;

                text-align: center;
                }

                [class*="row"]{
                border: #3333ff solid 1px;
                }*/
            {/literal}
        </style>
        <link href="{$resources_dir}OpenM-Book/gui/css/css-community.css" rel="stylesheet" type="text/css" rel="stylesheet">
        
    </head>
    <body>
        {include file='include/navBar.tpl'}
        {include file='include/menu.tpl'}

        <div class="container-fluid container-withmenunavigation">
            {include file='include/alert.tpl'}
            
            <div class="row-fluid"><div class="span12">Le retour JSON : <br><pre><code id="retourJSON">  </code></pre></div></div>

            <!-- Zone communauté  -->
            <div id="divParent" class="hero-unit"></div>
            
            
          <!--   <br><br><br><br><br><br><br>           
            <div class="hero-unit">                
                <div class="row-fluid">
                    <div id="navigation_community" class="span10 well" style="display: none">
                        <span>Communauté en cours :</span><br><br>
                        <ul id="navigation_community_container" class="breadcrumb">
                        </ul>
                    </div>
                </div>
                <div id="action" class="row-fluid" style="display: none">
                    <div class="span10 well">
                        <span>Action Possible :</span>
                        <div id="action_container" class="row-fluid">
                        </div>
                    </div>                
                </div>
               
                <div class="row-fluid">
                    <div class="span10 well">
                        <legend>Contenu de la communauté :<span class="name-community"></span></legend>
                        <div id="div_community_container" class="row-fluid">
                            <div class="span10">
                                <p>Les sous-communautées :</p>
                                <div id="community_container" class="row-fluid">
                                </div>
                            </div>
                        </div>
                        <br>
                        
                        <div class="row-fluid">
                            <div class="span10">
                                <p>Utilisateur dans la communauté :</p>
                                <div id="user_community">
                                    No body :(
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        
        
            <!-- FIN Zone communauté  -->  
            
        </div>


       
        <script src="{$links.js_client}OpenM_Book"></script>
        -->
         {include file='include/ressource_js.tpl'}
         
        <script src="{$links.js_client}OpenM_Book"></script>
       
        <script src="{$resources_dir}OpenM-Book/gui/js/CommunityControler.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/CommunityGui.js"></script>
        <script src="{$resources_dir}OpenM-Book/gui/js/CommunityDAO.js"></script>
        
        <script type="text/javascript">            
         {literal}$(function(){
            
            ressources_dir = "{/literal}{$resources_dir}{literal}";
            communityId =  "{/literal}{$communityId}{literal}";
            divParent = "divParent";
            

            OpenM_Book_CommunityPagesControler.init(divParent, ressources_dir);
            var controler =  OpenM_Book_CommunityPagesControler.communityPage(communityId);
            controler.display();
           
          });
         {/literal}</script>
        </body>
    </html>