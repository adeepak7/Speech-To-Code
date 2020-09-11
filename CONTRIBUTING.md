
# How to contribute?
* Design of DFA
  * Design the DFA in xelatex using `vaucanson-g` package.
  * Use the following code below for designing a simple DFA:
        
        \documentclass{article}

        % good old times
        \usepackage{vaucanson-g}

        \begin{document}

        % first of all, we define our grid
        \begin{VCPicture}{(0,-3)(6,3)}

        % and then we create the states
        \State[1]{(3,3)}{STATEA}
        \State[2]{(0,0)}{STATEB}
        \State[3]{(6,0)}{STATEC}

        % now, transition time

        % straight lines
        \EdgeR{STATEB}{STATEA}{C1}
        \EdgeR{STATEA}{STATEC}{C2}
        \EdgeR{STATEB}{STATEC}{C3}

        % arcs
        \LArcR{STATEA}{STATEB}{C4}
        \LArcR{STATEC}{STATEA}{C5}

        % loops
        \LoopN{STATEA}{C6}
        \LoopW{STATEB}{C7}
        \LoopE{STATEC}{C8}

        \end{VCPicture}

        \end{document} 


  * Output for the above code:
    
    <img src="https://github.com/adeepak7/Speech-To-Code/blob/master/res/Simple_DFA.png" height="200" width="400">
    
  * Further updtaes coming soon..... 
