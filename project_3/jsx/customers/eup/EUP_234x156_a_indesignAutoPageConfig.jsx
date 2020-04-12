var config = {
    "bookmarks":4,
    "defaultUnits":"pt",
    "baseLeading":13,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0,
    "applyTableBorderColor":'WHITE',
    "calcParaBoundsForStages": {
    "Pre-editing": true,
    "Typesetter QA": true,
    "Author proof": true,
    "Author revision": true,
    "Revises": true,
    "Copyediting": true,
    "Copyediting Check": true,
    "Typesetter Check": true,
    "Publisher Check": true,
    "Author Review": true,
    "Publisher Review": true,
    "Author Revision": true
  },
    "pageSize":{
        "width":442.205,
        "height":663.307
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":9
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            }
        },
    "watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[66.614,63.78,593.858,388.346
    ],
    "geoBoundsRecto":[66.614,496.063,593.858,820.63
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "REFERENCE":"LAYOUT2"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":324.567, "height":525.827,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":324.567, "height":527.244,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":68.031,
                "bottom":69.449,
                "inside":53.858,
                "outside":63.78
                },
            "otherPageMargin":{
                 "top":66.614,
                "bottom":69.449,
                "inside":53.858,
                "outside":63.78
                }
            },
            "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":324.567, "height":468.142,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":324.567, "height":527.244,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":125.631,
                "bottom":69.449,
                "inside":53.858,
                "outside":63.78
                },
            "otherPageMargin":{
                 "top":66.614,
                "bottom":69.449,
                "inside":53.858,
                "outside":63.78
                }
            }        
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredOnMargin":true,
        "versoPageValue":45,
        "rectoPageValue":0,
            "preferredPlacement":null
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":340.85, 
      "horizontalCenter":true
    },
    "resizeImage":{
      "allow":false,
      "modifyLimit":0
    },
    "figCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
    "tblCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
"continuedStyle":{
    "table":{
      "footer": {
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead2,jrnlHead3,jrnlRefHead,NL-T,NL-O,QUOTE-O",
            "after":"NL-O,QUOTE-O"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead2,jrnlHead3,jrnlRefHead,NL-T,NL-O,QUOTE-O",
            "after":"NL-O,QUOTE-O"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlArtTitle,jrnlHead1,jrnlHead2,jrnlHead3",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,40],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "docFontsList":[
       {
          "Adobe Garamond Pro": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
              }
          }
      },
        {
          "Din": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
            }
          }
        },
          {
          "Symbol (T1)": {
            "Regular": {
                "Arial Unicode MS": "Regular"
              },
                "Italic": {
                    "Arial Unicode MS": "Regular"
              },
                "Bold": {
                    "Arial Unicode MS": "Regular"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Roman"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Italic"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Raleway", "fontStyle":"Medium"},
            {"fontFamily":"Din", "fontStyle":"Italic"},
            {"fontFamily":"Din", "fontStyle":"Roman"},
            {"fontFamily":"Din", "fontStyle":"Bold Italic"},
            {"fontFamily":"Din", "fontStyle":"Bold"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVT']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRT']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null}    
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
            "LAYOUT1":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            },
        "REFERENCE":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "COLOR4":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            }
        },
     "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "10px",
                    "font-family" : "'Adobe Garamond Pro', Adobe Garamond Pro"
                },
                "fontPath"  : "Adobe Garamond Pro/Adobe Garamond Pro.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'Adobe Garamond Pro-Bold',Adobe Garamond Pro-Bold",
                    "font-size" : "10px",
                    "line-height" : "12px",
                    "padding" : "0.5px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Adobe Garamond Pro-Regular',Adobe Garamond Pro-Regular",
                    "font-size" : "10px",
                    "line-height" : "12px",
                    "padding" : "0px 0px 0px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "468pt"
              },
              "font" : {
                  "size"    : "12pt",
                  "ledding" : "14pt",
                  "path"    : "/Adobe Garamond Pro-Regular/",
                  "ext"     : "otf",
                  "bold"    : "Adobe Garamond Pro-Bold",
                  "italic"  : "Adobe Garamond Pro-Italic",
                  "bold_italic":"Adobe Garamond Pro-BoldItalic",
                  "main"    : "Adobe Garamond Pro-Regular"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "468pt"
              },
              "font" : {
                "size"    : "1pt",
                "ledding" : "13pt",
                "path"    : "/Adobe Garamond Pro/",
                "ext"     : "otf",
                  "bold"    : "Adobe Garamond Pro-Bold",
                  "italic"  : "Adobe Garamond Pro-Italic",
                  "bold-italic":"Adobe Garamond Pro-BoldItalic",
                  "main":"Adobe Garamond Pro-Regular",
              }
           }
        },
    "stubColObj":{
        "top": {
            "STUB_COLUMN": false,
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "RELATED_ARTICLE_INFO": true
        }
    },
"runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlRefGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                    ],
                "columnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                    ],
                "openerPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                },
            "otherPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                }
            }
        },
     {"xpath":"//div[@class='jrnlFootNoteFNGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                    ],
                "columnDetails":[
                  {"width":223, "height":627,"floatsCited":false,"gutter":0},
                  {"width":223, "height":627,"floatsCited":false,"gutter":22}
                    ],
                "openerPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                },
            "otherPageMargin":{
                 "top":86,
                "bottom":79,
                "inside":72,
                "outside":72
                }
            }
        },
    ] 
}