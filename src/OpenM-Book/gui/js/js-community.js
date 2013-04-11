//lorsqu'on vient de selectionner une communauté via la Zone Communauté'
function select_community(communityId){
    var community = AllCommunities[communityId];
    if (community){
        showLoading();
        OpenM_Book.getCommunityChilds(community.id, retourGetCommunityChilds);                        
    }else{
        showError("community id : " + communityId + " est inconnu ...");
    }  
    return false;
}
//lorsqu'on vient de selectionner une communauté via la navigation'
function select_community_navigation(communityId){
    var community = AllCommunities[communityId];
    if (community){
        addBranchCommunity(community, community.child);
    }else{
       showError("community id : " + communityId + " est inconnu ...");     
    }
    return false;
}
function addCommunityAJAX(){
    alert("Ajout d'une communauté !");
}


//Ajoute une communauté (graphique) à la div ZONE
function addCommunity(community){
   $(divId_zone_community).append(community.ToZoneHTML());
    return false;
}

//Navige dans une banche de communauté
function addBranchCommunity(community, communityChilds){
   //on supprime le contenu de la Zone COMmunity
   $(divId_zone_community).empty();   
   if (!communityChilds && community.nbAncestor ==0 ){
       //1er communauté. pas de navigation
       $(divId_navigation_div).hide();
       addCommunity(community);
   }else{
       
       if (community.nbChild != 0){
           //la navigation       
        $(divId_navigation_div).show();
        $(divId_navigation_community).empty();
        if (community.nbAncestor != 0){
            //on utilise ces propres ancetre
            for (i in community.ancestor){
                $(divId_navigation_community).append(community.ancestor[i].ToNavigationHTML());
            }           
        }      
        $(divId_navigation_community).append(community.ToNavigationHTML(true));
        //LA zone community
        for (idarray in communityChilds){ 
            addCommunity(communityChilds[idarray]);
        }
        //if (community.usrCanAddSubCommu){
           var ajout = "<div class='span3'><a href='#' onclick='addCommunityAJAX();' class='btn btn-inverse btn-large'><i class='icon-white icon-plus'></i>&nbsp;Ajout communauté</a></div>";
            //<div id='community-"+ this.id +"' class='community span3'
            $(divId_zone_community).append(ajout);
        //}                
       }
       else{
           //pas d'enfant donc on laisse la communauté'
           //addCommunity(community);
           addBranchCommunity(community.lastAncestor,community.lastAncestor.child );
       }   
   }
}

 
 //transforme l'obj JSON rettourner par GetCommunityChild en objet javaScript community
 function castJsonToCommunity(data){
     try
  {
  data = JSON.parse(data);         
     if (data.STATUS == OpenM_Book.RETURN_STATUS_OK_VALUE){
      //Création communauté en cours
      var commuEnCour;
      
       if (!AllCommunities[data.CPP.CID]){
              commuEnCour = new Community(data.CPP.CID, data.CPP.CNA);
              AllCommunities[commuEnCour.id] = commuEnCour; 
          }else{
            commuEnCour = AllCommunities[data.CPP.CID];
          }          
          commuEnCour.name = data.CPP.CNA;
          commuEnCour.usrCanAddSubCommu = (data.UCAC == "1")?true:false;
          commuEnCour.usrCanRegisterInto = (data.UCR == "1" )?true:false;
          commuEnCour.loaded = true;
      

      for (var i=0;i<data.CCP.length;i++)
      {           
          var community = AllCommunities[data.CCP[i].CID];
          if (!community){
              community = new Community(data.CCP[i].CID, data.CCP[i].CNA);
              community.ancestor = commuEnCour.ancestorClone(); 
              AllCommunities[community.id] = community; 
          }
          community.addAncestor(commuEnCour);
          commuEnCour.addChild(community); 
      }
       return commuEnCour;    
     }else{
         var message = data.ERROR_MESSAGE;
         var str ="Une erreur c'est produit lors du chargement des communautées...";
         str += (message)?", message : "+message:"";
        showError(str); 
        return false; 
     } 
  }
catch(err)
  {
     var message = "Une erreur est survenu lors du chargement des données. message :" + err;
     showError(message);
     return false; 
  } 
 }

//Est executer au retour de la fonction GetCommunityChilds
 function retourGetCommunityChilds(data){
    $("#retourJSON").html(data);
    var commuEnCour = castJsonToCommunity(data);
    if (commuEnCour){
        if (commuEnCour.child)
            addBranchCommunity(commuEnCour, commuEnCour.child);
    }        
 }

function showError(message){
    $(divId_alert).append("<div class='alert alert-error alert-block span4 offset4'><button type='button' class='close'>x</button><h4>Erreur :</h4>" +message+ "</div>");      
    $(".close").on("click", function(event){  
        $('.alert').hide('slow');
    });
}

function showLoading(){
    $(divId_zone_community).empty(); 
    $(divId_zone_community).html("<img src='"+ressources_dir+"OpenM-Book/gui/img/ajax-loader.gif'>");
} 

//Class Community   
function Community(id, name, usrCanAddSubCommu, usrCanRegisterInto ,url) { 
    if (!url) { url ="#"; } 
    if (!name) { name ="Community : "+id; } 
    if (!usrCanAddSubCommu){ usrCanAddSubCommu = false;}
    if (!usrCanRegisterInto){usrCanRegisterInto = false;}
    
    this.id = id; 
    this.name = name;
    this.url = url;
    this.child = new Array();
    this.ancestor = new Array();
    this.usrCanAddSubCommu = usrCanAddSubCommu; 
    this.usrCanRegisterInto = usrCanRegisterInto;
    this.nbChild = 0;
    this.nbAncestor = 0;
    this.lastAncestor=undefined;
    this.loaded = false;
     
     
    this.addChild = function(community){
        this.child[community.id]= community;
        this.nbChild++;
    } 
    
    this.addAncestor = function(community){
        this.ancestor[community.id]= community;
        this.nbAncestor++;
        this.lastAncestor = community;
    }
     
    this.ToZoneHTML = function() { 
        var str = "";
        if (!this.loaded){            
           str="<div id='community-"+ this.id +"' class='community span3' onclick='select_community("+ this.id +");' >"+ this.name +"</div>"; 
        }else
        {
           if (this.usrCanAddSubCommu){
               str="<div id='community-"+ this.id +"' class='community span3' onclick='select_community("+ this.id +");' >"+ this.name +"</div>";         
           }else{
               if (this.nbChild >0){
                   str="<div id='community-"+ this.id +"' class='community span3' onclick='select_community("+ this.id +");' >"+ this.name +"</div>";                    
               }else{
                   str="<div id='community-"+ this.id +"' class='community span3' onclick='alert("+ this.id +");' >"+ this.name +"</div>";                    
               }
           }           
        }
        return str;
    }
    
    this.ToNavigationHTML = function(active){
        if (!active) { active =false; } 
        if (active){
            return "<li class='active'>"+ this.name +"</li>";
        }else{
            return "<li><a href='#' onclick='select_community_navigation("+ this.id +");'  >"+ this.name+"</a> <span class='divider'>/</span></li>";                
        }    
   }
   
   this.childSortedByName = function(){
       var childSorted = this.child.sort(function (a,b){
           return a.name.localeCompare(b.name);
       });
       return childSorted;
   }
   
   this.ancestorClone = function(){
       var clone = new Array();
       for (var i in this.ancestor){
           clone[i] = this.ancestor[i];
       }
       return clone;
   }
} 


/**  Variable Globale   **/
divId_zone_community = "#zone_community";
divId_navigation_community = "#navigation_community";    
divId_navigation_div = "#navigation_div";
divId_alert = "#div_alert";
AllCommunities = new Array();  
 
   
   
   
 /* Jeux de données */  
 /*
community01 = new Community(1, "Miage", "#"); 
AllCommunities[community01.id] = community01;
community02 = new Community(2, "Paris", "#");
AllCommunities[community02.id] = community02;
community03 = new Community(3, "Toulouse", "#");
AllCommunities[community03.id] = community03;
community04 = new Community(4, "Marseille", "#");
AllCommunities[community04.id] = community04;
community05 = new Community(5, "L3", "#");
AllCommunities[community05.id] = community05;
community06 = new Community(6, "M1", "#");
AllCommunities[community06.id] = community06;
community07 = new Community(7, "M2", "#");
AllCommunities[community07.id] = community07;
community08 = new Community(8, "L3", "#");
AllCommunities[community08.id] = community08;
community09 = new Community(9, "M1", "#");
AllCommunities[community09.id] = community09;
community10 = new Community(10, "2010", "#");
AllCommunities[community10.id] = community10;
community11 = new Community(11, "2011", "#")
AllCommunities[community11.id] = community11;
community12 = new Community(12, "2012", "#");
AllCommunities[community12.id] = community12;
community13 = new Community(13, "2010", "#");
AllCommunities[community13.id] = community13;
community14 = new Community(14, "2012", "#");
AllCommunities[community14.id] = community14;
community15 = new Community(15, "2009", "#");
AllCommunities[community15.id] = community15;
community16 = new Community(16, "2010", "#");
AllCommunities[community16.id] = community16;
community17 = new Community(17, "2013", "#");
AllCommunities[community17.id] = community17;
community18 = new Community(18, "M1", "#");
AllCommunities[community18.id] = community18;
community19 = new Community(19, "2012", "#");
AllCommunities[community19.id] = community19;



community20 = new Community(20, "2012", "#");
AllCommunities[community20.id] = community20;
community21 = new Community(21, "2008", "#");
AllCommunities[community21.id] = community21;
community22 = new Community(22, "2007", "#");
community23 = new Community(23, "1999", "#");
community24 = new Community(24, "2013", "#");
community25 = new Community(25, "2014", "#");
community26 = new Community(26, "2001", "#");
community27 = new Community(27, "2002", "#");
community28 = new Community(28, "2003", "#");
community29 = new Community(29, "2004", "#");
community30 = new Community(30, "2005", "#");
community31 = new Community(31, "2006", "#");
community32 = new Community(32, "2000", "#");
community33 = new Community(33, "2015", "#");
AllCommunities[community22.id] = community22;
AllCommunities[community23.id] = community23;
AllCommunities[community24.id] = community24;
AllCommunities[community25.id] = community25;
AllCommunities[community26.id] = community26;
AllCommunities[community27.id] = community27;
AllCommunities[community28.id] = community28;
AllCommunities[community29.id] = community29;
AllCommunities[community30.id] = community30;
AllCommunities[community31.id] = community31;
AllCommunities[community32.id] = community32;
AllCommunities[community33.id] = community33;

community09.addChild(community20);
community09.addChild(community21);
community09.addChild(community22);
community09.addChild(community23);
community09.addChild(community24);
community09.addChild(community25);
community09.addChild(community26);
community09.addChild(community27);
community09.addChild(community28);
community09.addChild(community29);
community09.addChild(community30);
community09.addChild(community31);
community09.addChild(community32);
community09.addChild(community33);


//Les enfants
//niv 1/
community01.addChild(community02);
community01.addChild(community03);
community01.addChild(community04);
//niv 2
community02.addChild(community18);
community03.addChild(community05);
community03.addChild(community06);
community03.addChild(community07);
community04.addChild(community08);
community04.addChild(community09);
//niv 3
community18.addChild(community19);
community07.addChild(community13);
community07.addChild(community14);
community08.addChild(community10);
community08.addChild(community11);
community08.addChild(community12);
community09.addChild(community15);
community09.addChild(community16);
community09.addChild(community17);

//ancetre
//nivo 2
community02.addAncestor(community01);
community03.addAncestor(community01);
community04.addAncestor(community01);
//nivo 3
community18.addAncestor(community01);
community18.addAncestor(community02);
community05.addAncestor(community01);
community05.addAncestor(community03);
community06.addAncestor(community01);
community06.addAncestor(community03);
community07.addAncestor(community01);
community07.addAncestor(community03);
community08.addAncestor(community01);
community08.addAncestor(community04);
community09.addAncestor(community01);
community09.addAncestor(community04);
//niveau 4
community19.addAncestor(community01);
community19.addAncestor(community02);
community19.addAncestor(community18);
community13.addAncestor(community01);
community13.addAncestor(community03);
community13.addAncestor(community07);
community14.addAncestor(community01);
community14.addAncestor(community03);
community14.addAncestor(community07);
community10.addAncestor(community01);
community10.addAncestor(community04);
community10.addAncestor(community08);
community11.addAncestor(community01);
community11.addAncestor(community04);
community11.addAncestor(community08);
community12.addAncestor(community01);
community12.addAncestor(community04);
community12.addAncestor(community08);
community15.addAncestor(community09);
community15.addAncestor(community04);
community15.addAncestor(community01);
community16.addAncestor(community09);
community16.addAncestor(community04);
community16.addAncestor(community01);
community17.addAncestor(community09);
community17.addAncestor(community04);
community17.addAncestor(community01);
*/
/* FIN jeux de données */






