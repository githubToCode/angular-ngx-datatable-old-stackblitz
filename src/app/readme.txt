I was triing today ,  added some console.logs
https://next.plnkr.co/edit/hwww2QXDh9Je5Bc9ld3O?p=preview&utm_source=legacy&utm_medium=worker&utm_campaign=next&preview

=============================
Will start tomorrow, Good Night.

how is your weekend going on? I was looking for apartments today.
====
why apartmnet search
====
yeah changing to 2 bed
very bad day yaar. I am at DMV. Looks like half houston is at DMV office only. still waiting here...
very badly exhausted weekend.

thought of WFH, since it is getting late texted my manager changing it to day off.
========
its been an hours I sent you msg. still 30 more in front of me.

internet also not working properly no videos to pass time...

========================== START ==========================================
Able to add dynamic template from parent component.

Here one more thing to resolve:
right now parent component ng-template is reference for template to be used.
[cellTemplate]="cellTemplate"
[iconCellTemplate]="iconCellTemplate"
here I am passing different types of templates which can be used by cell renderer.
Next thing to solve:
Should pass these template ref as an object like.
column = [
  {
    colId: '',
    template: 'cellTemplate'
  },
  {
    colId: '',
    template: 'iconCellTemplate'
  },
  {
    colId: '',
    template: 'dateCellTEmplate'
  }
]
<dataTable
  templates={
    cellTemplate: cellTemplate,
    iconCellTemplate: iconCellTemplate,
    dateCellTemplate: dateCellTEmplate
  }
/>
<cellRenderer [templates]="templates" [column]="column" [row]="row" />
in side cell cellRenderer
this.templateTobeUsed = (this.column.template && this.templates[this.column.template]) || null;
cellRenderer html
<span *ngIf="templateTobeUsed">
  <ng-container *ngTemplateOutlet="templateTobeUsed; context: {$implicit: {column: column, row: row}}"></ng-container>
</span>
<span *ngIf="!templateTobeUsed">{{row[column.field]}} S</span>

Tried this once didn't work, need to check what might be thee issue.
Now if you look at current, if you see values with "S" means cell being rendered from default, or if it is with "Y" cell being rendered from template ref.

================================ END ===============================
leme go through and understand.
=============== custom drop down ======
Working on custom dropdown
=================================== START ================================
Almost done with custom dropdown.
Remaining:
1. Need to handle click outside event to close dropdown when user clicks anywhere else.
2. Adding proper icons and styles.
3. Create a method to generate path for each dropdown item.(Right now it is static)
4. Highlight selected item in the dropdown list.

Add to the list if you think of any more...

GD NIGHT :) and GD Morning :)
=================================== END ================================

Thank you  my super hero
========

couldn’t do it today. I will be late to ofc tomorrow.

Gd nt :)
=== sure nps
==
Added a directive for click check, you may update it.
 there are other two drop down , need to match same kind of styles.
 isChild method in click-outside directive is nto working properly.

 ================ START ==============================
 
1. click out side is working properly I don't see any issues with isChild, I have changed clickOutside directive to nested-dropdown element(All component specific functionality should be independent to others, creating outside dependencies will make component less reusable.)
2. Applied similar styles to match with other dropdowns, I see animation is slightly vary(Try to copy styles from vdl-select, since those are keyFrame related styles I couldn't catch them from developer tool. Tried to give similar animation).
3. Fixed scroll issue.
4. Highlight selected item.
5. Added few other configs.
  <nested-dropdown
    [data]="dropdownData"
    [placeHolderText]="dropdownPlaceHolderText"
    [selected]="dropdownSelected"
    [spaceAround]="30"
    [position]="'align'"
    [groupSelactable]="true"
    [collapseOnClose]="true"
    (onSelect)="onDropdownSelect($event)"
  >

  [spaceAround]: default 0
  --- To create left and right space around overlay dropdown(width = 100% + spaceAround),                            creates left and right 15px extra space to each.

  [position]: default 'align'
  --- Self explanatory
      options = 'left' || 'right' || 'top' || 'bottom' || 'center' || 'align'

  [groupSelactable]: default false
  --- To Enable or Disable group list item selection.

  [collapseOnClose]: default false
  --- To close all opened groups on close(selected item styles won't be cleared), when it is true it retains the state.

==================== Good Night :) ==============================
thank you
====

I am waiting...

=================

Just reached home, sorry couldn’t wait longer. need to go out to get some stuff since my licence expires today.

will work on that. Have a nice weekend :)

=========================================

Added overlay to disable backround selections. Drop me what else to be done. Have a nice day :)

==========================================

How is your weekend?

============================

weekend was like arranging the room.

=============================

Nice, all set for Mom and Dad :)

I am WFH today.

============================
yes. all set. do u know wht. friday i was checking whats up status. I think u did something in setting ,so was not able any status not even you display pic.

=====




open the filter according , you can see the tree there


cause need to support keyboard navigation too

=====

OK, let me try.
======ok==========
i m online
If we can do the focus on tabbing like going from Mode to Dept through tabbing
created separate nested-tree component and added tree structure to that.

TODO

need to style it, and mainly ,keyboard , then reatin the selection.

=====

Ayyooo, I couldn’t do it yesterday, took time for me to finish support work and full sleep after that.

======ok======

README getting longer
Height scroll

The left two accordion . should have their own individual scroll.
when dept accordion close and filter accordion open, then filter accordion should take rest of all avilable space

overlay feature
=====
drag the splitter to minimum size .then open the overlay nested dropdown . texts are getting overlapped.

retain the selection on the tree. and active color is 'blue'
===
 Can I get the new things added as like some comments like //
 

===will be online afte 9pm PST ====

Started working on it, connected to github now will create PR after my changes you can see differences.

You know logic inside HTMl always confuses me, hard for me to understand it at glance like js logic :)
like Angular I mean, more logic for render structure.

Somehow hotload is not working when I change on nested-tree files you created. any idea?

No Worries, took care of it its because of invalid path added at appModule.

Updated everuthing in new branch 'nested-dropdown'.

Created pull request.

https://github.com/githubToCode/angular-ngx-datatable-test

UPDATES:

1. Did not use vdl-tree even with it we need to make lot of customization to achive our requirement which makes much complicated.
2. Implemented keyboard navigation on existing structure.
3. On focus of existing select hit enter to open list.
4. Default first item will be pre focused.
5. from there you can use down/up arrows or tab/ shift tab to navigate next and previous.
6. use right arrow to toggle children if any available.(Right now right arrow is being used for open and close, we can implement left arrow to close).

Known defect:
1. When we toggle close first most item using keyboard navigation drodown loosing focus.(need to look into it, its 3:30AM will continue tomorrow).

GOOD Night :)

==============



==============

Concern to iterate and create level: 1,
      path: '0',

most imp for today is height calcluation and individual scroll on left nav content for both accordion

======

Sure, lets have webex this afternoon. I am free any time.

===

https://codepen.io/anon/pen/MMbryK

added all html structure. added the functionaly how currently calculating the height.
added style on leftnav.component.scss but dont thikc so it working casue selection .so added only required css on styles.css.

minimum supprting is 768*1024

Thank you.
i forget to give patch 1 to master, direct commited files to master. sorry
look for 
https://github.com/githubToCode/angular-ngx-datatable-test/commit/7662a1de7a562f3d2885e1302bc25760c361d4dc



=======


Are you online ===
=======

I am online.

OMG lost all my changes.

Lost 5 hours of work let me do it again.

Done:

Pending: Changing dynamic style for accordian based on buttom element height change as we discussed.

As we discussed filters contengt should have its own scroll that's implemented, if you remove those styles acoordian content will get scroll if content is more than the available height.

I hope adding accordian height style based on the button content height won't be a big change. I couldn't implement it now. Full sleepy yaar.

Created new repo.

Good Night :)

===================

Added formatter method for nested-dropdown data to dynamically add path and level values.

Observed one issue with tabbing when it has more than 3 levels of data. I will fix it tomorrow. will make it more generic.

Few more hours to meet Mom and Dad :).

Good Night :)

=====================

Are you doing WFH today?

======
