<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

delete_option( 'lsx-mega-menus-version' );
delete_option( 'LSXMM_DATA' );
