import { computed } from "vue";
import { my, round, ui, game } from "./_variables";

export function useInvalidComputeds() {
  const computedAmIHost = computed(() => {
    const roomCreatorExists = game.players.some((player) => player.playerID === game.roomCreatorID);
    if (roomCreatorExists) {
      return my.playerID === game.roomCreatorID;
    }
    return (
      game.players.length > 0 &&
      (game.players[0].playerID === my.playerID || game.players.some((player) => player.playerID === my.playerID && player.isHost))
    );
  });

  const computedSysAdminName = computed(() => {
    console.log("computedSysAdminName debug:", {
      playersCount: game.players?.length || 0,
      sysAdminIndex: round.sysAdminIndex,
      players: game.players?.map((p) => ({ name: p.name, role: p.role, playerID: p.playerID })) || [],
    });

    if (game.players && game.players.length > 0 && round.sysAdminIndex > -1) {
      const adminPlayer = game.players[round.sysAdminIndex];
      console.log("adminPlayer at index", round.sysAdminIndex, ":", adminPlayer);
      if (adminPlayer && adminPlayer.name) {
        console.log("Returning admin name:", adminPlayer.name);
        return adminPlayer.name;
      }
    }

    // Fallback: find any player with SysAdmin role
    if (game.players && game.players.length > 0) {
      const adminPlayer = game.players.find((player) => player.role === "SysAdmin");
      console.log("Fallback admin player:", adminPlayer);
      if (adminPlayer && adminPlayer.name) {
        console.log("Returning fallback admin name:", adminPlayer.name);
        return adminPlayer.name;
      }
    }

    console.log("No admin found, returning default");
    return "System Administrator";
  });

  const computedSysAdminIndex = computed(() => round.sysAdminIndex);

  const hasEmojiInName = computed(() => {
    if (!ui.nameInput) return false;
    return /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      ui.nameInput,
    );
  });

  const computedShibbolethRequired = computed(() => {
    if (round.shibboleth && ui.shibboleth.toUpperCase() !== round.shibboleth.toUpperCase()) {
      return true;
    }
    return false;
  });

  const computedUnclaimedPasswords = computed(() => {
    if (game.allEmployeePasswords.length < 1) return 0;
    return game.allEmployeePasswords.filter((p) => !p.claimed).length;
  });

  const computedUncrackedPasswords = computed(() => {
    if (!game || !Array.isArray(game.allEmployeePasswords)) {
      return { array: [], count: 0 };
    }
    const uncracked = game.allEmployeePasswords.filter((password) => !password.claimed);
    return { array: uncracked, count: uncracked.length };
  });

  const computedPlayersByScore = computed(() => {
    return [...game.players].sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
  });

  const computedCheevos = computed(() => {
    // TODO: This entire setup sucks balls.
    // Come up with a better way to hand out cheevos.
    const playerTrophyStats = game.players.map((player) => ({
      name: player.name,
      cracks: 0,
      cracked: 0,
      selfPwn: 0,
      passwordsCreated: 0,
      crashesCaused: 0,
      passwordAttempts: 0,
    }));

    game.crackSummary.forEach((crack) => {
      playerTrophyStats[crack.attackerIndex].cracks += 1;
      playerTrophyStats[crack.victimIndex].cracked += 1;
      if (crack.attackerIndex === crack.victimIndex) {
        playerTrophyStats[crack.attackerIndex].selfPwn += 1;
      }
    });

    game.allEmployeePasswords.forEach((pw) => {
      playerTrophyStats[pw.playerIndex].passwordsCreated += 1;
    });

    game.crashSummary.forEach((crash) => {
      playerTrophyStats[crash.playerIndex].crashesCaused += 1;
    });

    game.players.forEach((player, playerIndex) => {
      playerTrophyStats[playerIndex].passwordAttempts = player.passwordAttempts;
    });

    const pickWinner = (list: typeof playerTrophyStats, key: keyof (typeof playerTrophyStats)[0]) => {
      const sorted = [...list].sort((a, b) => (Number(a[key]) <= Number(b[key]) ? 1 : -1));
      if (!sorted[0] || Number(sorted[0][key]) === 0) return null;
      const winner = { ...sorted[0] };
      if (sorted.length > 1 && sorted[0][key] === sorted[1][key]) {
        winner.name = "TIE";
      }
      return winner;
    };

    return {
      trophyStats: playerTrophyStats,
      bestCracker: pickWinner(playerTrophyStats, "cracks"),
      mostCracked: pickWinner(playerTrophyStats, "cracked"),
      mostSelfPwns: pickWinner(playerTrophyStats, "selfPwn"),
      mostCrashes: pickWinner(playerTrophyStats, "crashesCaused"),
      mostPasswords: pickWinner(playerTrophyStats, "passwordsCreated"),
      mostAttempts: pickWinner(playerTrophyStats, "passwordAttempts"),
    };
  });

  return {
    computedAmIHost,
    computedSysAdminName,
    computedSysAdminIndex,
    hasEmojiInName,
    computedShibbolethRequired,
    computedUnclaimedPasswords,
    computedUncrackedPasswords,
    computedPlayersByScore,
    computedCheevos,
  };
}
