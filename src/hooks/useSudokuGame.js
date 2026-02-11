import { useState, useRef, useEffect } from "react";
import { solveSudoku, getSolvedBoard } from "../logic/sudokuSolver";
import { isValid } from "../logic/validator";
import { SAMPLES } from "../data/samples";

export const useSudokuGame = () => {
    const [board, setBoard] = useState(
        Array(9)
            .fill()
            .map(() => Array(9).fill(0)),
    );
    const [cellStatus, setCellStatus] = useState(
        Array(9)
            .fill()
            .map(() => Array(9).fill("")),
    );
    const [initialBoard, setInitialBoard] = useState(null);
    const [solutionKey, setSolutionKey] = useState(null);
    const [panelMsg, setPanelMsg] = useState(
        "Pilih level atau isi papan sendiri!",
    );
    const [activeCell, setActiveCell] = useState(null);
    const [candidates, setCandidates] = useState(
        Array(9)
            .fill()
            .map(() => Array(9).fill([])),
    );
    const [isHintActive, setIsHintActive] = useState(false);
    const [isSolving, setIsSolving] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [isInstant, setIsInstant] = useState(false);

    const speedRef = useRef({ delay: 50, skipMode: false });

    useEffect(() => {
        speedRef.current.delay = speed;
    }, [speed]);

    const calculateAllCandidates = (currentBoard) => {
        const newCandidates = Array(9)
            .fill()
            .map(() => Array(9).fill([]));
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (currentBoard[r][c] === 0) {
                    const possibleNums = [];
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(currentBoard, r, c, num))
                            possibleNums.push(num);
                    }
                    newCandidates[r][c] = possibleNums;
                }
            }
        }
        return newCandidates;
    };

    const handleLevel = (lv) => {
        if (isSolving) return;

        const puzzles = SAMPLES[lv];
        const randomIndex = Math.floor(Math.random() * puzzles.length);
        const chosenPuzzle = puzzles[randomIndex];
        const newBoard = chosenPuzzle.map((r) => [...r]);

        setBoard(newBoard);
        setInitialBoard(newBoard.map((r) => [...r]));
        setCandidates(
            Array(9)
                .fill()
                .map(() => Array(9).fill([])),
        );
        setIsHintActive(false);
        setCellStatus(
            newBoard.map((r) => r.map((c) => (c !== 0 ? "fixed" : ""))),
        );
        setSolutionKey(null);

        setPanelMsg(
            `Mode ${lv.toUpperCase()} (Soal #${randomIndex + 1}) siap!`,
        );
        setSpeed(50);
        setActiveCell(null);
    };

    const handleInputChange = (e, r, c) => {
        if (isSolving) return;
        if (cellStatus[r][c] === "fixed") return;

        if (cellStatus[r][c] !== "" && cellStatus[r][c] !== "user-filled") {
            const ns = cellStatus.map((row) => [...row]);
            ns[r][c] = "user-filled";
            setCellStatus(ns);
        }

        const val = e.target.value;
        if (val === "" || (/^[1-9]$/.test(val) && val.length === 1)) {
            const num = val === "" ? 0 : parseInt(val);
            const newBoard = board.map((row) => [...row]);
            newBoard[r][c] = num;
            setBoard(newBoard);

            if (!initialBoard) setSolutionKey(null);
            if (isHintActive) setCandidates(calculateAllCandidates(newBoard));
        }
    };

    const handleHint = () => {
        if (isSolving) return;
        if (isHintActive) {
            setIsHintActive(false);
            setCandidates(
                Array(9)
                    .fill()
                    .map(() => Array(9).fill([])),
            );
            setPanelMsg("Pencil marks disembunyikan.");
        } else {
            setIsHintActive(true);
            setCandidates(calculateAllCandidates(board));
            setPanelMsg("📝 Pencil marks ditampilkan!");
        }
    };

    const handleSolveCell = () => {
        if (isSolving) return;
        if (!activeCell) {
            setPanelMsg("⚠️ Klik kotak yang mau diisi!");
            return;
        }

        const { r, c } = activeCell;
        if (cellStatus[r][c] === "fixed") {
            setPanelMsg("⛔ Ini angka soal!");
            return;
        }

        let currentSolution = solutionKey;
        if (!currentSolution) {
            setPanelMsg("🔍 Mencari solusi...");
            const solved = getSolvedBoard(board);
            if (!solved) {
                setPanelMsg("⚠️ Papan ini tidak memiliki solusi valid!");
                return;
            }
            currentSolution = solved;
            setSolutionKey(solved);
        }

        const answer = currentSolution[r][c];
        const newBoard = board.map((row) => [...row]);
        newBoard[r][c] = answer;
        setBoard(newBoard);
        const newStatus = cellStatus.map((row) => [...row]);
        newStatus[r][c] = "trial";
        setCellStatus(newStatus);
        setPanelMsg(`✨ Terisi angka: ${answer}`);

        if (isHintActive) setCandidates(calculateAllCandidates(newBoard));
    };

    const handleSolve = async () => {
        if (isSolving) return;

        setIsHintActive(false);
        setCandidates(
            Array(9)
                .fill()
                .map(() => Array(9).fill([])),
        );

        const emptyCellsCount = board
            .flat()
            .filter((cell) => cell === 0).length;
        if (emptyCellsCount === 0) {
            setPanelMsg("Papan sudah penuh!");
            return;
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] !== 0 && cellStatus[r][c] !== "fixed") {
                    const val = board[r][c];
                    const tempBoard = board.map((row) => [...row]);
                    tempBoard[r][c] = 0;
                    if (!isValid(tempBoard, r, c, val)) {
                        setPanelMsg(
                            `⚠️ Input salah di baris ${r + 1} kolom ${c + 1}!`,
                        );
                        const ns = cellStatus.map((row) => [...row]);
                        ns[r][c] = "error";
                        setCellStatus(ns);
                        return;
                    }
                }
            }
        }

        setIsSolving(true);
        setPanelMsg("🔍 Mencari solusi...");

        speedRef.current.skipMode = isInstant;
        if (isInstant) setSpeed(0);

        const cleanStatus = cellStatus.map((row) =>
            row.map((s) => (s === "error" ? "user-filled" : s)),
        );
        setCellStatus(cleanStatus);

        const boardToSolve = board.map((r) => [...r]);
        const stats = { iterations: 0 };
        const startTime = performance.now();

        const updateVisual = (nb, r, c, status) => {
            setBoard(nb);
            setCellStatus((prev) => {
                const ns = prev.map((row) => [...row]);
                ns[r][c] = status;
                return ns;
            });
        };

        const solved = await solveSudoku(
            boardToSolve,
            updateVisual,
            speedRef,
            stats,
        );
        const duration = (performance.now() - startTime).toFixed(0);
        setIsSolving(false);

        if (solved) {
            setSolutionKey(boardToSolve);
            setBoard(boardToSolve);
            setCellStatus((prev) =>
                prev.map((row) =>
                    row.map((status) =>
                        status === "fixed" ? "fixed" : "trial",
                    ),
                ),
            );

            setPanelMsg(
                `🎉 SELESAI!
• Sel Kosong: ${emptyCellsCount}
• Iterasi: ${stats.iterations} langkah
• Waktu: ${duration} ms`,
            );
        } else {
            setPanelMsg(
                `❌ GAGAL!
• Sel Kosong: ${emptyCellsCount}
• Iterasi: ${stats.iterations} langkah
• Waktu: ${duration} ms`,
            );
        }
    };

    const handleCheck = () => {
        if (isSolving) return;

        // 1. Validasi tabrakan angka dulu (Cegah Hang)
        let directErrors = 0;
        const newStatus = cellStatus.map((row) => [...row]);

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const val = board[r][c];
                if (val !== 0 && cellStatus[r][c] !== "fixed") {
                    const tempBoard = board.map((row) => [...row]);
                    tempBoard[r][c] = 0;
                    if (!isValid(tempBoard, r, c, val)) {
                        newStatus[r][c] = "error";
                        directErrors++;
                    }
                }
            }
        }

        if (directErrors > 0) {
            setCellStatus(newStatus);
            setPanelMsg(`⚠️ Ada ${directErrors} tabrakan angka!`);
            return;
        }

        // 2. Validasi solusi
        let currentSolution = solutionKey;
        if (!currentSolution) {
            setPanelMsg("🔍 Memvalidasi...");
            // Gunakan initialBoard agar solver bekerja dari kondisi awal yang bersih
            const sourceBoard = initialBoard || board;
            const solved = getSolvedBoard(sourceBoard);
            if (!solved) {
                setPanelMsg("⚠️ Papan ini tidak memiliki solusi valid!");
                return;
            }
            currentSolution = solved;
            setSolutionKey(solved);
        }

        let logicErrors = 0;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] !== 0 && cellStatus[r][c] !== "fixed") {
                    if (board[r][c] !== currentSolution[r][c]) {
                        newStatus[r][c] = "error";
                        logicErrors++;
                    } else if (newStatus[r][c] === "error") {
                        newStatus[r][c] = "user-filled";
                    }
                }
            }
        }
        setCellStatus(newStatus);
        setPanelMsg(
            logicErrors > 0
                ? `⚠️ Ada ${logicErrors} angka salah posisi!`
                : "✅ Aman terkendali!",
        );
    };

    const handleReset = () => {
        if (isSolving) return;
        setBoard(
            Array(9)
                .fill()
                .map(() => Array(9).fill(0)),
        );
        setCellStatus(
            Array(9)
                .fill()
                .map(() => Array(9).fill("")),
        );
        setInitialBoard(null);
        setSolutionKey(null);
        setIsHintActive(false);
        setCandidates(
            Array(9)
                .fill()
                .map(() => Array(9).fill([])),
        );
        setSpeed(50);
        setPanelMsg("Papan bersih. Silakan pilih level atau isi sendiri.");
    };

    const handleSkip = () => {
        speedRef.current.skipMode = true;
        setSpeed(0);
    };

    return {
        board,
        cellStatus,
        candidates,
        panelMsg,
        isSolving,
        speed,
        isHintActive,
        isInstant,
        setIsInstant,
        handleLevel,
        handleSolve,
        handleSolveCell,
        handleHint,
        handleCheck,
        handleReset,
        handleInputChange,
        handleSkip,
        setSpeed,
        setActiveCell,
    };
};
