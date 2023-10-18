<?php
/**
 * Plugin Name:       BOTTIMMO Widget
 * Description:       Die einfachste Weise BOTTIMMO Widgets einzubinden.
 * Version:           1.0.0
 * Requires at least: 6.3
 * Requires PHP:      7.0
 * Author:            BOTTIMMO IT
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bottimmo-widget
 *
 * @package           bottimmo-widget
 */

 if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * The options name
 */
define('BOTTIMMO_WIDGET_OPTIONS', 'bottimmo_widget_options');

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bottimmo_widget_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'bottimmo_widget_block_init' );

/**
 * Handle company slug
 */
function bottimmo_widget_get_endpoint_company_slug() {
	$btmOptions = get_option(BOTTIMMO_WIDGET_OPTIONS);
	return rest_ensure_response(esc_html($btmOptions['slug']));
}

/**
 * This function is where we register our routes for our plugin endpoint.
 */
function bottimmo_widget_register_routes() {
    // register_rest_route() handles more arguments but we are going to stick to the basics for now.
    register_rest_route( 'bottimmo-widget/v1', '/company-slug', array(
        // By using this constant we ensure that when the WP_REST_Server changes our readable endpoints will work as intended.
        'methods'  => WP_REST_Server::READABLE,
        // Here we register our callback. The callback is fired when this endpoint is matched by the WP_REST_Server class.
        'callback' => 'bottimmo_widget_get_endpoint_company_slug',
    ) );
}
add_action( 'rest_api_init', 'bottimmo_widget_register_routes' );

/**
 * Settings page (Admin)
 */
function bottimmo_widget_settings_page() {
	add_options_page(
        'BOTTIMMO',
        'BOTTIMMO Widgets',
        'manage_options',
        'bottimmo-widget',
        'bottimmo_widget_render_plugin_settings_page'
    );
}
add_action( 'admin_menu', 'bottimmo_widget_settings_page' );

function bottimmo_widget_render_plugin_settings_page() {
	?>
	<h2><?php echo esc_html(__('BOTTIMMO', 'bottimmo-widget')); ?></h2>
	<form action="options.php" method="post">
        <?php 
        settings_fields( BOTTIMMO_WIDGET_OPTIONS );
        do_settings_sections( 'bottimmo_widget_plugin' ); ?>
        <input name="submit" class="button button-primary" type="submit" value="<?php esc_attr_e( 'Save' ); ?>" />
    </form>
	<?php
}

function bottimmo_widget_register_settings() {
    register_setting(
      BOTTIMMO_WIDGET_OPTIONS, BOTTIMMO_WIDGET_OPTIONS,
      'bottimmo_widget_example_plugin_options_validate'
    );
    
    add_settings_section(
        'api_settings',
        'Widget Settings',
        'bottimmo_widget_plugin_section_text',
        'bottimmo_widget_plugin'
    );

    add_settings_field(
        'bottimmo_widget_setting_slug',
        'Firmen-Kürzel (Slug)',
        'bottimmo_widget_setting_slug',
        'bottimmo_widget_plugin',
        'api_settings'
    );
}
add_action( 'admin_init', 'bottimmo_widget_register_settings' );

function bottimmo_widget_example_plugin_options_validate( $input ) {
    $input['slug'] = trim($input['slug']);
	return $input;
}

function bottimmo_widget_plugin_section_text() {
    echo '<p>' . wp_kses(__('Hier setzen Sie bitte Ihr individuelles Firmen-Kürzel <strong>(Slug)</strong>.', 'bottimmo-widget'), 'strong') . '</p>';
    echo '<p>' . esc_html(__('Eine Änderung des Slugs wirkt sich NICHT auf bereits vorhandene Widgets aus! Bitte speichern Sie bestehende Widgets jeweils neu.', 'bottimmo-widget')) . '</p>';
}

function bottimmo_widget_setting_slug() {
    $options = get_option( BOTTIMMO_WIDGET_OPTIONS );
    echo "<input id='bottimmo_widget_setting_slug' name='bottimmo_widget_options[slug]' type='text' value='" . esc_attr( $options ? $options['slug'] : '' ) . "' />";
}

/**
 * Write script tag into footer to load iframe loader
 */
function bottimmo_widget_append_javascript() {
  wp_enqueue_script(
    'bottimmo_widget_settings_loader',
    plugins_url('/build/assets/js/settings.inc.js', __FILE__),
    false,
    '1.0'
  );
  wp_enqueue_script(
    'bottimmo_widget_iframe_loader',
    plugins_url('/build/assets/js/iframe-loader.js', __FILE__),
    false,
    '1.0'
  );
  $translation_array = array('pluginDir' => plugins_url('', __FILE__) );
  wp_localize_script( 'bottimmo_widget_iframe_loader', 'btmJsVars', $translation_array );
}
add_action('wp_footer', 'bottimmo_widget_append_javascript');

function bottimmo_widget_append_admin_script() {
  wp_enqueue_script(
    'bottimmo_widget_settings_loader',
    plugins_url('/build/assets/js/settings.inc.js', __FILE__),
    false,
    '1.0'
  );
  wp_enqueue_script(
    'bottimmo_widget_iframe_loader',
    plugins_url('/build/assets/js/iframe-loader.js', __FILE__),
    false,
    '1.0'
  );
  $translation_array = array(
    'pluginDir' => plugins_url('', __FILE__),
    'adminUrl' => admin_url('options-general.php?page=bottimmo-widget')
  );
  wp_localize_script( 'bottimmo_widget_iframe_loader', 'btmJsVars', $translation_array );
}
add_action( 'admin_enqueue_scripts', 'bottimmo_widget_append_admin_script' );